import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./fragments";

export const CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query GetCurrentUser {
    getCurrentUser {
      ...UserFragment
    }
  }
`;
