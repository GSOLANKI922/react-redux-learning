import { gql } from "../../../.app/__generated__/gql";

export const MOVIE_LIST = gql(`
query ListMovies($sort: ListMoviesSort, $filter: ListMoviesFilter) {
    listMovies(sort: $sort, filter: $filter) {
      message
      count
      data {
        adult
        originalTitle
        budget
        countries {
          englishName
        }
        id
      }
    }
  }`);

export const MOVIE = gql(`
query Movie($movieId: ID!) {
  movie(id: $movieId) {
    data {
      adult
      budget
      imageUrl
      movieImages {
        filePath
      }
      originalLanguage
      originalTitle
      overview
      popularity
      releaseDate
      revenue
      runtime
      status
      title
    }
  }
}`);

export const PERSONS_LIST = gql(`
query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
  listPersons(filter: $filter, sort: $sort) {
    count
    data {
      adult
      birthday
      gender
      name
      knownForDepartment
      placeOfBirth
      popularity
      id
    }
  }
}`);

export const PERSON = gql(`
query Person($personId: ID!) {
  person(id: $personId) {
    data {
      adult
      alsoKnownAs
      biography
      birthday
      gender
      name
      placeOfBirth
      popularity
      knownForDepartment
      profilePath
    }
  }
}`);
