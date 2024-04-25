import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    email
    firstName
    id
    lastName
    name
    profileImage
  }
`;
