-- progressSource is now derived from unit (no longer user-selectable).
-- Count / Time / Kilogram goals are log-driven (LOGS).
-- Percentage goals are task-driven (TASKS).
UPDATE "Goal" SET "progressSource" = 'LOGS' WHERE "unit" IN ('Count', 'Time', 'Kilogram');
UPDATE "Goal" SET "progressSource" = 'TASKS' WHERE "unit" = 'Percentage';
