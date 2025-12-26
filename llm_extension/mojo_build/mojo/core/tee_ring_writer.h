#pragma once
#include <cstddef>
#include <cstdint>
#include <string_view>

namespace mojo::core {

class TeeRingWriter {
 public:
  static TeeRingWriter& Get();  // lazy singleton

  // Non-copyable
  TeeRingWriter(const TeeRingWriter&) = delete;
  TeeRingWriter& operator=(const TeeRingWriter&) = delete;

  // Append one frame: writes [u32_le len][bytes] to the ring and notifies.
  // Safe to call from hot paths; cheap branches when disabled/fails.
  void Append(const void* data, size_t len);

 private:
  TeeRingWriter();
  ~TeeRingWriter();

  void EnsureInit();
  void WriteFrame(const uint8_t* p, size_t n);
  void Notify();

  // state
  int shm_fd_ = -1;
  uint8_t* base_ = nullptr;
  size_t   map_len_ = 0;

  int sock_fd_ = -1;

  bool inited_ = false;
  bool failed_ = false;

  // Ring layout
  static constexpr uint32_t kMagic = 0x4C4C4D52; // 'RMLL'
  struct Header {
    uint32_t magic;
    uint32_t version;
    uint64_t head;   // byte offset in data region
    uint64_t tail;   // byte offset in data region
    uint64_t cap;    // capacity (bytes) of data region
  };

  Header* H() { return reinterpret_cast<Header*>(base_); }
  uint8_t* Data() { return base_ + sizeof(Header); }
};

} // namespace mojo::core
