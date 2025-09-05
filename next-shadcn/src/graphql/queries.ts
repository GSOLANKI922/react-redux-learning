import { gql } from "@/types/__generated__";

export const MOVIES_LIST = gql(`
 query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {
  listMovies(filter: $filter, sort: $sort) {
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
      castAndCrew {
        alsoKnownAs
        alsoKnownAs
      }
      genres {
        id
        name
      }
      movieVideo {
        id
        countryCode
      }
      movieImages {
        id
        imageType
        filePath
      }
      movieCollection {
        name
        id
        backdropPath
      }
      languages {
        englishName
        id
        languageCode
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

export const GET_CURRENT_USER = gql(`
query GetCurrentUser {
  getCurrentUser {
    id
    email
    profileImage
    name
    firstName
    lastName
  }
}
`);

export const GET_NEW_TOKEN = gql(`
  query RefreshToken($data: RefreshTokenInput!) {
    refreshToken(data: $data) {
      token
      user {
        id
        email
        profileImage
        name
        firstName
        lastName
      }
    }
  }
`);
