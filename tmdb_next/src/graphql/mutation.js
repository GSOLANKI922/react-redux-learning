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

export const DELETE_PERSON = gql`
  mutation DeletePerson($deletePersonId: ID!) {
    deletePerson(id: $deletePersonId) {
      message
    }
  }
`;

export const EDIT_PERSON = gql`
  mutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {
    updatePerson(id: $updatePersonId, data: $data) {
      message
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation CreatePerson($data: PersonInput!) {
    createPerson(data: $data) {
      message
    }
  }
`;
