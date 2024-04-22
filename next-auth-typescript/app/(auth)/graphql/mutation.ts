import { gql } from "@/.app/__generated__/gql"


export const LOGIN_USER = gql(`
mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
  emailPasswordLogIn(data: $data) {
    data {
      token
      user {
        email
        firstName
        name
        profileImage
        id
        name
      }
      refreshToken
    }
    message
  }
}`)

export const CREATE_USER = gql(`
mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {
    emailPasswordSignUp(data: $data) {
      message
    }
}`)