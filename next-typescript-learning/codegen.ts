import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_URL,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
