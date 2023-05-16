import { gql } from "@apollo/client";

export const TOP_MOVIE_LISTS = gql`
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

export const MOVIE_LISTS = gql`
  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
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

export const GET_FAVOIRITE_MOVIES_LISTS = gql`
  query Query {
    getFavoriteMovies {
      id
      movie {
        id
        title
        budget
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

export const PERSON_DETAILS = gql`
  query PersonDetais($personId: ID!) {
    person(id: $personId) {
      data {
        id
        knownForDepartment
        name
        gender
        popularity
        adult
      }
    }
  }
`;
