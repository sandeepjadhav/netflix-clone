import "dotenv/config";

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Path to your Prisma schema(s)
  schema: 'prisma/schema.prisma',
  
  // Database connection details (v7+)
  datasource: {
    url: env('DATABASE_URL'),
  },
});
