import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
  mutation CreatePerson($data: PersonInput!) {
    createPerson(data: $data) {
      message
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($data: UpdatePersonInput!, $updatePersonId: ID!) {
    updatePerson(data: $data, id: $updatePersonId) {
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

export const CREATE_MOVIE = gql`
  mutation CreateMovie($data: MovieInput) {
    createMovie(data: $data) {
      message
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $updateMovieId, data: $data) {
      message
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
      message
    }
  }
`;
