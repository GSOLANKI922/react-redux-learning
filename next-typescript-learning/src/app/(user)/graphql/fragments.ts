import { gql } from "@apollo/client";

export const MOVIE_FRAGMENT = gql`
  fragment MovieFragment on User {
    email
    firstName
    id
    lastName
    name
    profileImage
  }
`;
