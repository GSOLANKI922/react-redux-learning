import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      data {
        token
        user {
          email
        }
      }
      message
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovieId($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
      message
    }
  }
`;
