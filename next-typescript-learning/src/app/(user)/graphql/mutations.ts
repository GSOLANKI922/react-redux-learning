import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./fragments";

export const GET_NEW_TOKEN = gql`
  ${USER_FRAGMENT}
  query RefreshToken($data: RefreshTokenInput!) {
    refreshToken(data: $data) {
      token
      user {
        ...UserFragment
      }
    }
  }
`;

export const LOGIN = gql`
  ${USER_FRAGMENT}
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      data {
        token
        refreshToken
        user {
          ...UserFragment
        }
      }
    }
  }
`;
