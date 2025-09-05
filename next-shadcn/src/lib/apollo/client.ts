import {
  ApolloClient,
  ApolloLink,
  DefaultContext,
  InMemoryCache,
  from,
  fromPromise,
} from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { APP_INFO, GRAPHQL_ERROR_CODES } from "@/constants";
import { isDevelopmentServer } from "../utils";
import { type Observable, getMainDefinition } from "@apollo/client/utilities";
import get from "lodash/get";
import { toast } from "sonner";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import isFunction from "lodash/isFunction";
import { authServerLink, mainServerLink } from "./links";

import "client-only";
import { GET_NEW_TOKEN } from "@/graphql/queries";

interface ClientOptions {
  accessToken?: string;
  refreshToken?: string;
  logout?: () => void;
}

interface Context extends DefaultContext, ClientOptions {}

const getNewToken = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new Error("Please provide refresh token");
  }
  try {
    const client = new ApolloClient({
      link: authServerLink,
      cache: new InMemoryCache(),
    });

    const { data, errors } = await client.query({
      query: GET_NEW_TOKEN,
      variables: {
        data: { refreshToken },
      },
    });

    if (errors) throw new Error(errors[0].message);
    if (!data.refreshToken?.token) throw new Error("Something went wrong!");
    return data.refreshToken.token as string;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Something went wrong!");
  }
};

const contextLink = setContext((_, defaultContext) => {
  const { accessToken, headers } = defaultContext as unknown as Context;

  return {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      ...headers,
    },
  };
});

const responseLink = new ApolloLink((operation, forward) => {
  const definition = getMainDefinition(operation.query);
  if (
    definition.kind === "OperationDefinition" &&
    definition.operation === "mutation"
  ) {
    return forward(operation).map((response) => {
      const data = get(response, ["data"]);

      if (data) {
        const message = get(Object.values(data), ["0", "message"]);
        if (message) {
          toast.success(message);
        }
      }

      return response;
    });
  }

  return forward(operation);
});

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let pendingRequests: Function[] = [];
let newAccessToken: string;

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error?.extensions?.code) {
          switch (error.extensions.code) {
            case GRAPHQL_ERROR_CODES.SESSION_EXPIRED: {
              let forward$: Observable<unknown>;
              if (!isRefreshing) {
                isRefreshing = true;
                const { refreshToken, logout } =
                  operation.getContext() as Context;

                forward$ = fromPromise(
                  getNewToken(refreshToken)
                    .then((newToken) => {
                      // TODO: Update server session
                      resolvePendingRequests();
                      newAccessToken = newToken;
                      isRefreshing = false;

                      return newToken;
                    })
                    .catch((error: unknown) => {
                      pendingRequests = [];

                      if (isFunction(logout)) {
                        logout();
                      }

                      if (error instanceof Error) toast.error(error.message);
                      else toast.error("Something went wrong!");

                      return null;
                    })
                    .finally(() => {
                      isRefreshing = false;
                    })
                ).filter(Boolean);
              } else {
                forward$ = fromPromise(
                  new Promise((resolve) => {
                    pendingRequests.push(() => resolve(null));
                  })
                );
              }
              return forward$.flatMap(() => {
                const oldHeaders = operation.getContext().headers;

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newAccessToken}`,
                  },
                });

                return forward(operation);
              });
            }
            default: {
              toast.error(error.message);
              break;
            }
          }
        }
      }
      return;
    }

    if (networkError) {
      toast.error("Network error");
      return;
    }
  }
);

const createApolloClient = (link: HttpLink, options: ClientOptions = {}) =>
  new ApolloClient({
    link: from([responseLink, errorLink, contextLink, link]),
    cache: new InMemoryCache(),
    connectToDevTools: isDevelopmentServer(),
    version: APP_INFO.version,
    name: APP_INFO.title,
    defaultContext: options,
  });

export const createClient = (options: ClientOptions = {}) =>
  createApolloClient(mainServerLink, options);

export const createAuthClient = (options: ClientOptions = {}) =>
  createApolloClient(authServerLink, options);
