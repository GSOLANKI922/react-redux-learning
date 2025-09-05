import { cookies } from "next/headers";
import { REFRESH_TOKEN } from "@/graphql/mutations";
import { Context } from "@apollo/client";
import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { serverLink } from "./links";
import { COOKIE, ERROR_CODES, SITE_CONFIG } from "@/constants";

const setTokens = async (accessToken: string) => {
  const cookieStore = cookies();
  (await cookieStore).set({
    name: COOKIE.token,
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(Date.now() + 36000 * 1000),
  });
};

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
                const { refreshToken } = operation.getContext() as Context;
                forward$ = fromPromise(
                  getNewToken(refreshToken)
                    .then((newToken) => {
                      resolvePendingRequests();
                      newAccessToken = newToken;
                      isRefreshing = false;
                      if (newToken) {
                        setTokens(newToken);
                      }

                      return newToken;
                    })
                    .catch((_error: unknown) => {
                      pendingRequests = [];
                      // TODO: handle logout here if possible
                      // if (isFunction(logout)) {
                      //   logout();
                      // }
                      // eslint-disable-next-line no-console
                      if (error instanceof Error) console.log(error.message);
                      // eslint-disable-next-line no-console
                      else console.log("Something went wrong!");

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
              // eslint-disable-next-line no-console
              console.log(error.message);
              break;
            }
          }
        }
      }
      return;
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log("networkError", networkError);
      return;
    }
  }
);

const contextLink = setContext(async (_, { headers, token }) => {
  return {
    headers: {
      ...(token && {
        authorization: `Bearer ${token}`,
      }),
      ...headers,
    },
  };
});

const createQueryClient = (link: HttpLink) =>
  new ApolloClient({
    link: from([errorLink, contextLink, link]),
    cache: new InMemoryCache(),
    version: SITE_CONFIG.VERSION,
    name: SITE_CONFIG.TITLE,
    ssrMode: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });

export const serverQueryClient = createQueryClient(serverLink);
