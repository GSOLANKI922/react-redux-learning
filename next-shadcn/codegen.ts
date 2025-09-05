import { CodegenConfig } from "@graphql-codegen/cli";
import { config } from "dotenv";

config();

const codegenConfig: CodegenConfig = {
  generates: {
    "./src/types/__generated__/": {
      schema: "https://tmdb-server-dev.logicwind.co/graphql",
      documents: ["src/graphql/**/*.ts"],
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
        enumsAsTypes: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default codegenConfig;
