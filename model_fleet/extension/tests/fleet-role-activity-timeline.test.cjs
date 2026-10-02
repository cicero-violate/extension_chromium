const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const background = fs.readFileSync(path.join(root, 'background.js'), 'utf8');
const pane = fs.readFileSync(path.join(root, 'control-pane.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'control-pane.html'), 'utf8');

test('fleet persists bounded role activity transitions from central state mutation', () => {
  assert.match(background, /MAX_ROLE_ACTIVITY_SAMPLES = 8000/);
  assert.match(background, /ROLE_ACTIVITY_RETENTION_MS = 24 \* 60 \* 60 \* 1000/);
  assert.match(background, /roleActivity: \[\]/);
  assert.match(background, /function roleActivityCounts\(state\)/);
  assert.match(background, /if \(worker\.currentAssignmentId\) counts\.running \+= 1/);
  assert.match(background, /function recordRoleActivity\(state, observedAt = now\(\)\)/);
  assert.match(background, /JSON\.stringify\(previous\.roles\) === JSON\.stringify\(roles\)/);
  assert.match(background, /recordRoleActivity\(state\);\s*state\.generation/);
});

test('overview exposes a role utilization gantt-style timeline and range selector', () => {
  assert.match(html, /Role utilization timeline/);
  assert.match(html, /id="roleTimeline"/);
  assert.match(html, /id="roleTimelineRange"/);
  assert.match(html, /running share/);
  assert.match(html, /idle share/);
  assert.match(html, /blocked \/ offline share/);
});

test('timeline renders role lanes across time with running and unavailable proportions', () => {
  assert.match(pane, /function renderRoleTimeline\(\)/);
  assert.match(pane, /const axisTicks = \[0, 0\.25, 0\.5, 0\.75, 1\]/);
  assert.match(pane, /role-timeline-row/);
  assert.match(pane, /role-timeline-run/);
  assert.match(pane, /role-timeline-unavailable/);
  assert.match(pane, /runningPct = total/);
  assert.match(pane, /displayedRange = Math\.max\(1, nowAt - startAt\)/);
  assert.match(pane, /role-timeline-run\" style=\"height:/);
  assert.match(pane, /roleActivityCountsEqual\(state, nextState\)/);
  assert.match(pane, /displayedRange = Math\.max\(1, nowAt - startAt\)/);
  assert.match(pane, /role-timeline-run\" style=\"height:/);
  assert.match(pane, /renderRoleTimeline\(\);\s*renderWorkers\(\)/);
  assert.match(pane, /ROLE_TIMELINE_RANGE_KEY/);
});
