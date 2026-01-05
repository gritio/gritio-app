import 'dotenv/config';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: envPath });
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
