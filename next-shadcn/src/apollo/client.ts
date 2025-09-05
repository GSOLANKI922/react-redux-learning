import { ERROR_CODES, SITE_CONFIG } from "@/constants";
import { REFRESH_TOKEN } from "@/graphql/mutations";
import {
  ApolloClient,
  ApolloLink,
  DefaultContext,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition, type Observable } from "@apollo/client/utilities";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
import { toast } from "sonner";

import { serverLink } from "./links";

export interface ClientOptions {
  accessToken?: string;
  refreshToken?: string;
  logout?: () => void;
  updateSession?: (accessToken: string) => void;
}

interface Context extends DefaultContext, ClientOptions {}

const getNewToken = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new Error("Please provide refresh token");
  }
  try {
    const client = new ApolloClient({
      link: serverLink,
      cache: new InMemoryCache(),
    });

    const { data, errors } = await client.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        data: {
          refreshToken,
        },
      },
    });

    if (data?.refreshToken?.token) return data.refreshToken.token;

    throw new Error(errors?.[0].message ?? "Something went wrong!");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Something went wrong!");
  }
};

const responseLink = new ApolloLink((operation, forward) => {
  const definition = getMainDefinition(operation.query);
  const { hideMessage } = operation.getContext();
  if (
    definition.kind === "OperationDefinition" &&
    definition.operation === "mutation"
  ) {
    return forward(operation).map((response) => {
      const data = get(response, ["data"]);
      if (data) {
        const message = get(Object.values(data), ["0", "message"]);
        if (message && !hideMessage) {
          toast.success(message);
        }
      }

      return response;
    });
  }

  return forward(operation);
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];
let newAccessToken: string;

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code) {
          switch (error.extensions.code) {
            case ERROR_CODES.SESSION_EXPIRED: {
              let forward$: Observable<unknown>;
              if (!isRefreshing) {
                isRefreshing = true;
                const { refreshToken, logout, updateSession } =
                  operation.getContext() as Context;
                forward$ = fromPromise(
                  getNewToken(refreshToken)
                    .then((newToken) => {
                      resolvePendingRequests();
                      newAccessToken = newToken;
                      isRefreshing = false;

                      if (isFunction(updateSession)) {
                        updateSession(newToken);
                      }

                      return newToken;
                    })
                    .catch((_error: unknown) => {
                      pendingRequests = [];

                      if (isFunction(logout)) {
                        logout();
                      }
                      // TODO: handle this after setup
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
              // kept for future use
              // const { hideMessage } = operation.getContext();
              // if (hideMessage) {
              //   return;
              // }
              toast.error(error.message);
              break;
            }
          }
        }
      }
      return;
    }

    if (networkError) {
      // TODO: handle this after setup
      toast.error("Network error");
      return;
    }
  }
);

const createQueryClient =
  (link: HttpLink) =>
  ({ accessToken, ...rest }: ClientOptions = {}) => {
    const contextLink = setContext((_, defaultContext) => {
      const { headers } = defaultContext;
      return {
        headers: {
          ...(accessToken && {
            authorization: `Bearer ${accessToken}`,
          }),
          ...headers,
        },
        ...rest,
      };
    });

    return new ApolloClient({
      link: from([contextLink, responseLink, errorLink, link]),
      cache: new InMemoryCache(),
      version: SITE_CONFIG.VERSION,
      name: SITE_CONFIG.TITLE,
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
        },
        watchQuery: {
          fetchPolicy: "no-cache",
        },
      },
    });
  };

export const queryClient = createQueryClient(serverLink);
