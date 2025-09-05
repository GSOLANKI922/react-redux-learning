import { gql } from "@/types/__generated__";

export const REFRESH_TOKEN = gql(`
 query RefreshToken($data: RefreshTokenInput!) {
  refreshToken(data: $data) {
    token
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
`);

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

export const SING_UP = gql(`
 mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {
  emailPasswordSignUp(data: $data) {
    message
  }
}
 
 `);
