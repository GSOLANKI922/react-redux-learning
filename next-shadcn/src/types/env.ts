import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    NEXT_PRIVATE_MAINTENANCE: z.string(),
    REVALIDATE_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_ENV: z.enum(["development", "staging", "uat", "production"]),
    NEXT_PUBLIC_GRAPHQL_SERVER_URL: z.string().url(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GRAPHQL_SERVER_URL: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PRIVATE_MAINTENANCE: process.env.NEXT_PRIVATE_MAINTENANCE,
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
  },
  emptyStringAsUndefined: true,
});

export default env;
