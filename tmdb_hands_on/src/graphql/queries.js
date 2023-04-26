import { gql } from "@apollo/client";

export const MOVIE_LIST = gql`
  query ListMovies($sort: ListMoviesSort, $filter: ListMoviesFilter) {
    listMovies(sort: $sort, filter: $filter) {
      data {
        budget
        id
        title
        releaseDate
        revenue
        status
        adult
        originalLanguage
        originalTitle
        overview
        runtime
        tagline
        languages {
          englishName
          languageCode
          id
        }
        countries {
          englishName
          countryCode
          id
        }
      }
      count
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      data {
        budget
        id
        title
        releaseDate
        revenue
        status
      }
    }
  }
`;

export const GET_TOP_MOVIE = gql`
  query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {
    listMovies(filter: $filter, sort: $sort) {
      data {
        budget
        id
        title
        releaseDate
        revenue
        status
        adult
        originalLanguage
        originalTitle
        overview
        runtime
        tagline
        languages {
          englishName
          languageCode
          id
        }
        countries {
          englishName
          countryCode
          id
        }
      }
    }
  }
`;

export const PERSON_LIST = gql`
  query ListPersons($sort: ListPersonsSort!, $filter: ListPersonsFilter!) {
    listPersons(sort: $sort, filter: $filter) {
      data {
        name
        gender
        id
        knownForDepartment
      }
      count
    }
  }
`;

export const PERSION_DETAILS = gql`
  query Person($personId: ID!) {
    person(id: $personId) {
      data {
        id
        knownForDepartment
        gender
        name
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

export const GET_TITLE_BY_ID = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      data {
        title
      }
    }
  }
`;
