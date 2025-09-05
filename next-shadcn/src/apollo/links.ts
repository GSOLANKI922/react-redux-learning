import env from "@/types/env";
import { HttpLink } from "@apollo/client/core";

export const serverLink = new HttpLink({
  uri: env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
});
