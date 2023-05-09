import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      data {
        token
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

export const CREATE_MOVIE = gql`
  mutation CreateMovie($data: MovieInput) {
    createMovie(data: $data) {
      message
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation Mutation($updateMovieId: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $updateMovieId, data: $data) {
      message
    }
  }
`;



