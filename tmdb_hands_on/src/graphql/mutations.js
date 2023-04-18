import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      data {
        token
        user {
          email
        }
      }
    }
  }
`;
