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
      }
      count
    }
  }
`;

export const PERSION_LIST = gql`
  query ListPersons($sort: ListPersonsSort!, $filter: ListPersonsFilter!) {
    listPersons(sort: $sort, filter: $filter) {
      data {
        name
        gender
        id
        knownForDepartment
        popularity
        profilePath
      }
    }
  }
`;
