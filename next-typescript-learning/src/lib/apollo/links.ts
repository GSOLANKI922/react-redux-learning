import { HttpLink } from "@apollo/client";

export const authServerLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_URL,
});

export const mainServerLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_URL,
});
