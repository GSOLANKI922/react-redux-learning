import { gql } from "@apollo/client";

export const LOGIN = gql(`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
        refreshToken
        user {
          id
          email
          profileImage
          name
          firstName
          lastName
        }
      }
    }
  }
`);
