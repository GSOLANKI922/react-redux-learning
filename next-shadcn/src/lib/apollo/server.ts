import { APP_INFO } from "@/constants";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { authServerLink, mainServerLink } from "./links";

import "server-only";

const contextLink = setContext(async (_, { headers, token }) => {
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
  };
});

const createClient = (link: HttpLink) =>
  new ApolloClient({
    link: from([contextLink, link]),
    cache: new InMemoryCache(),
    version: APP_INFO.version,
    name: APP_INFO.title,
    ssrMode: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });

export const serverClient = createClient(mainServerLink);
export const serverAuthClient = createClient(authServerLink);
