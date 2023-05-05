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
