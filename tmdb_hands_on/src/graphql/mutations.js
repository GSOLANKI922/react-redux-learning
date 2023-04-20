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

export const DELETE_PERSION = gql`
  mutation DeletePerson($deletePersonId: ID!) {
    deletePerson(id: $deletePersonId) {
      message
    }
  }
`;

export const Edit_PERSION_DETAILS = gql`
  mutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {
    updatePerson(id: $updatePersonId, data: $data) {
      data {
        knownForDepartment
        name
        gender
        id
      }
      message
    }
  }
`;

export const CREATE_PERSION = gql`
  mutation Mutation($data: PersonInput!) {
    createPerson(data: $data) {
      message
      data {
        id
        name
        gender
        knownForDepartment
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation Mutation($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
      message
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation Mutation($updateMovieId: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $updateMovieId, data: $data) {
      data {
        movie {
          adult
          id
          budget
          originalLanguage
          originalTitle
          title
          overview
          releaseDate
          revenue
          runtime
          status
          tagline
          countries {
            countryCode
          }
          languages {
            id
            languageCode
          }
        }
      }
      message
    }
  }
`;
