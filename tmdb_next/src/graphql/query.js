import { gql } from "@apollo/client";

export const MOVIE_LISTS = gql`
  query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {
    listMovies(filter: $filter, sort: $sort) {
      data {
        budget
        id
        title
      }
      count
    }
  }
`;

export const GET_MOVIE_BY_ID_FOR_EDIT_DATA = gql`
  query getMovieById($movieId: ID!) {
    movie(id: $movieId) {
      data {
        id
        adult
        budget
        originalTitle
        originalLanguage
        overview
        releaseDate
        revenue
        runtime
        tagline
        title
        countries {
          countryCode
          id
          englishName
        }
        languages {
          id
          languageCode
          englishName
        }
        status
      }
    }
  }
`;

export const GET_MOVIE_BY_ID_FOR_DETAILS_PAGE = gql`
  query getMovieById($movieId: ID!) {
    movie(id: $movieId) {
      data {
        id
        budget
        originalLanguage
        releaseDate
        revenue
        tagline
        title
      }
    }
  }
`;

export const MOVIE_LIST_COUNTRIES = gql`
  query Countries {
    countries {
      data {
        id
        countryCode
        englishName
      }
    }
  }
`;

export const MOVIE_LIST_LANGUAGES = gql`
  query Languages {
    languages {
      data {
        englishName
        languageCode
        id
      }
    }
  }
`;

export const PERSON_LISTS = gql`
  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
    listPersons(filter: $filter, sort: $sort) {
      data {
        id
        name
        gender
        adult
      }
      count
    }
  }
`;
