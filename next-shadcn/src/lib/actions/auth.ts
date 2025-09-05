"use server";

import { cookies } from "next/headers";
import { GET_CURRENT_USER } from "@/graphql/queries";

import { GetCurrentUserQuery } from "@/types/__generated__/graphql";

import { serverQueryClient } from "../apollo/server";

export async function getToken(type: "accessToken" | "refreshToken") {
  const cookiesList = await cookies();
  return cookiesList.get(type);
}

export async function getCurrentUser(
  token: string,
  refreshToken: string
): Promise<GetCurrentUserQuery | null | undefined> {
  try {
    const { data } = await serverQueryClient.mutate({
      mutation: GET_CURRENT_USER,
      context: {
        token,
        refreshToken,
      },
    });
    return data;
  } catch {
    return null;
  }
}
