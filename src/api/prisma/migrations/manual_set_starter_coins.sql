-- Give all existing users 0 starter coins (default value)
-- This is just for documentation; the @default(0) in schema.prisma handles this automatically

-- If you want to give existing users a welcome bonus, uncomment and run:
-- UPDATE "User" SET coins = 100 WHERE coins = 0;

-- To verify:
-- SELECT id, email, coins FROM "User" LIMIT 10;
