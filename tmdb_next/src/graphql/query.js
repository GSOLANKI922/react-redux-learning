import { gql } from "@apollo/client";

export const MOVIE_LISTS = gql`
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
      count
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
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
