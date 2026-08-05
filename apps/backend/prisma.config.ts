import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: '../../packages/database/src/prisma/schema.prisma',
  migrations: {
    path: '../../packages/database/src/prisma/migrations',
    seed: 'tsx ../../packages/database/src/prisma/seed',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});