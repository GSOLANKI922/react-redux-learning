"use client";
import React from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import getClient from "./apolloClient";
import { useSession } from "next-auth/react";

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (!session) return;
  const token = session.data?.user?.token as any;
  const client = getClient(token);
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
