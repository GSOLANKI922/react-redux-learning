import { gql } from "../../../__generated__/gql";

export const GET_MOVIE = gql(`
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
