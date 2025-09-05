"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider as Provider,
} from "@apollo/client";
import { createAuthClient, createClient } from "@/lib/apollo/client";
import { signOut, useSession } from "next-auth/react";

type Client = ApolloClient<NormalizedCacheObject>;
type ClientOptions = Parameters<typeof createClient>[0];

const ApolloProviderContext = createContext<null | {
  client: Client;
  authClient: Client;
}>(null);

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const options: ClientOptions = useMemo(
    () => ({
      accessToken: data?.accessToken || "",
      refreshToken: data?.refreshToken || "",
      logout() {
        signOut();
      },
    }),
    [data]
  );

  const client = useMemo(() => createClient(options), [options]);
  const authClient = useMemo(() => createAuthClient(options), [options]);

  return (
    <ApolloProviderContext.Provider
      value={{
        authClient,
        client,
      }}
    >
      <Provider client={client}>{children}</Provider>
    </ApolloProviderContext.Provider>
  );
};

export const useApollo = () => {
  const context = useContext(ApolloProviderContext);
  if (!context)
    throw new Error("useApollo must be used within ApolloProvider context");

  return context;
};

export default ApolloProvider;
