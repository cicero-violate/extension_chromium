#include "mojo/core/tee_ring_writer.h"

#if BUILDFLAG(IS_POSIX)
#include <errno.h>
#include <fcntl.h>
#include <signal.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/un.h>
#include <unistd.h>
#endif

#include <algorithm>

#include "base/check_op.h"
#include "base/notreached.h"
#include "base/no_destructor.h"
#include "build/build_config.h"

namespace mojo::core {

#if BUILDFLAG(IS_POSIX)
namespace {
constexpr const char* kShmPath = "/dev/shm/llm_mojo_ring.bin";
constexpr const char* kSockPath = "/tmp/llm_mojo.sock";
constexpr size_t kRingBytes = 16 * 1024 * 1024; // 16MB
constexpr uint32_t kVersion = 1;

static inline uint32_t le32(uint32_t v) { return v; } // little endian host
} // namespace
#endif

TeeRingWriter& TeeRingWriter::Get() {
  static base::NoDestructor<TeeRingWriter> inst;
  return *inst;
}

TeeRingWriter::TeeRingWriter() = default;
TeeRingWriter::~TeeRingWriter() = default;

void TeeRingWriter::EnsureInit() {
  if (inited_ || failed_)
    return;
#if !BUILDFLAG(IS_POSIX)
  failed_ = true; return;
#else
  // open/create shm file
  int fd = open(kShmPath, O_RDWR | O_CREAT, 0666);
  if (fd < 0) { failed_ = true; return; }
  size_t map_len = sizeof(Header) + kRingBytes;
  if (ftruncate(fd, static_cast<off_t>(map_len)) != 0) {
    close(fd); failed_ = true; return;
  }
  void* m = mmap(nullptr, map_len, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
  if (m == MAP_FAILED) { close(fd); failed_ = true; return; }

  shm_fd_ = fd; base_ = reinterpret_cast<uint8_t*>(m); map_len_ = map_len;

  // Initialize header if fresh (or validate magic)
  Header* hdr = H();
  if (hdr->magic != kMagic || hdr->version != kVersion || hdr->cap != kRingBytes) {
    hdr->magic = kMagic;
    hdr->version = kVersion;
    hdr->head = 0;
    hdr->tail = 0;
    hdr->cap = kRingBytes;
    msync(hdr, sizeof(Header), MS_SYNC);
  }

  // Best-effort connect to unix socket; keep fd for Notify()
  int s = socket(AF_UNIX, SOCK_DGRAM, 0);
  if (s >= 0) {
    sockaddr_un addr{};
    addr.sun_family = AF_UNIX;
    strncpy(addr.sun_path, kSockPath, sizeof(addr.sun_path)-1);
    if (connect(s, reinterpret_cast<sockaddr*>(&addr), sizeof(addr)) != 0) {
      close(s); s = -1;
    }
  }
  sock_fd_ = s;

  inited_ = true;
#endif
}

void TeeRingWriter::Append(const void* data, size_t len) {
#if !BUILDFLAG(IS_POSIX)
  (void)data; (void)len;
  return;
#else
  if (failed_) return;
  if (!inited_) EnsureInit();
  if (failed_ || !inited_) return;

  if (!data || len == 0) return;
  WriteFrame(reinterpret_cast<const uint8_t*>(data), len);
  Notify();
#endif
}

void TeeRingWriter::WriteFrame(const uint8_t* p, size_t n) {
#if BUILDFLAG(IS_POSIX)
  Header* hdr = H();
  uint8_t* data = Data();
  const uint64_t cap = hdr->cap;

  // Ensure space: advance tail until we can fit (4 + n)
  auto used = [&](uint64_t h, uint64_t t) { return (h + cap - t) % cap; };
  auto free = [&](uint64_t h, uint64_t t) { return cap - used(h, t) - 1; };

  const uint64_t need = 4 + n;
  while (free(hdr->head, hdr->tail) < need) {
    // drop one frame at tail: read its length
    uint8_t l4[4];
    for (int i = 0; i < 4; ++i)
      l4[i] = data[(hdr->tail + i) % cap];
    uint32_t L = static_cast<uint32_t>(l4[0] | (l4[1]<<8) | (l4[2]<<16) | (l4[3]<<24));
    hdr->tail = (hdr->tail + 4 + L) % cap;
  }

  // write [len][payload] with wrap
  uint32_t L = static_cast<uint32_t>(n);
  uint8_t len4[4] = {
    static_cast<uint8_t>(L & 0xFF),
    static_cast<uint8_t>((L >> 8) & 0xFF),
    static_cast<uint8_t>((L >> 16) & 0xFF),
    static_cast<uint8_t>((L >> 24) & 0xFF),
  };

  // copy len
  for (int i = 0; i < 4; ++i) {
    data[(hdr->head + i) % cap] = len4[i];
  }
  hdr->head = (hdr->head + 4) % cap;

  // copy payload
  // first segment until wrap
  uint64_t first = std::min<uint64_t>(n, cap - hdr->head);
  memcpy(data + hdr->head, p, first);
  // wrapped remainder, if any
  if (first < n) {
    memcpy(data, p + first, n - first);
  }
  hdr->head = (hdr->head + n) % cap;
#endif
}

void TeeRingWriter::Notify() {
#if BUILDFLAG(IS_POSIX)
  if (sock_fd_ < 0) return;
  // send just the head index as 8 bytes (little endian)
  uint64_t head = H()->head;
  uint8_t buf[8];
  for (int i = 0; i < 8; ++i) buf[i] = static_cast<uint8_t>((head >> (8*i)) & 0xFF);
  (void)send(sock_fd_, buf, sizeof(buf), MSG_DONTWAIT);
#endif
}

} // namespace mojo::core
