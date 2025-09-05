import { gql } from "../../../__generated__/gql";

export const GET_MOVIES = gql(`
  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
      count
      data {
        id
        adult
        budget
        homePage
        streamingOn
        originalLanguage
        originalTitle
        overview
        popularity
        releaseDate
        revenue
        runtime
        status
        tagline
        title
        video
        voteAverage
        voteCount
        createdAt
        imageUrl
        languages {
          id
          languageCode
          englishName
        }
        movieImages {
          id
          mediaId
          personId
          collectionId
          mediaType
          aspectRatio
          filePath
          height
          voteAverage
          voteCount
          width
          languageCode
          imageType
        }
        genres {
          id
          name
        }
        countries {
          id
          countryCode
          englishName
        }
        movieVideo {
          id
          mediaId
          mediaType
          languageCode
          countryCode
          site
          size
          official
          publishedAt
        }
      }
    }
  }
`);

export const GET_MOVIE = gql(`
query Movie($movieId: ID!) {
  movie(id: $movieId) {
    data {
      id
      adult
      budget
      homePage
      streamingOn
      originalLanguage
      originalTitle
      overview
      popularity
      releaseDate
      revenue
      runtime
      status
      tagline
      title
      video
      voteAverage
      voteCount
      createdAt
      castAndCrew {
        adult
        biography
        id
        name
      }
      genres {
        id
        name
      }
      languages {
        id
        languageCode
        englishName
      }
      countries {
        englishName
        countryCode
        id
      }
      imageUrl
    }
  }
}
`);

export const GET_PERSONS = gql(`
query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
  listPersons(filter: $filter, sort: $sort) {
    count
    data {
      id
      tmdbId
      birthday
      knownForDepartment
      deathday
      name
      alsoKnownAs
      gender
      biography
      popularity
      placeOfBirth
      profilePath
      homePage
      adult
    }
  }
}`);

export const GET_PERSON = gql(`
query Person($personId: ID!) {
  person(id: $personId) {
    data {
      id
      tmdbId
      birthday
      knownForDepartment
      deathday
      name
      alsoKnownAs
      gender
      biography
      popularity
      placeOfBirth
      profilePath
      homePage
      adult
    }
  }
}`);

export const GET_COUNTRIES = gql(`
  query Countries($filter: CountriesFilter) {
    countries(filter: $filter) {
      data {
        id
        englishName
        countryCode
      }
      count
    }
  }`);

export const GET_LANGUAGES = gql(`
  query Languages($filter: LanguagesFilter) {
    languages(filter: $filter) {
      data {
        languageCode
        id
        englishName
      }
      count
    }
  }`);

export const GET_GENRES = gql(`
query ListGenre {
  listGenre {
    id
    name
  }
}`);
