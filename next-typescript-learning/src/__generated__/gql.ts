/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment MovieFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n": types.MovieFragmentFragmentDoc,
    "\n  \n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  \n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          ...UserFragment\n        }\n      }\n    }\n  }\n": types.EmailPasswordLogInDocument,
    "\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      count\n      data {\n        id\n        adult\n        budget\n        homePage\n        streamingOn\n        originalLanguage\n        originalTitle\n        overview\n        popularity\n        releaseDate\n        revenue\n        runtime\n        status\n        tagline\n        title\n        video\n        voteAverage\n        voteCount\n        createdAt\n        imageUrl\n        languages {\n          id\n          languageCode\n          englishName\n        }\n        movieImages {\n          id\n          mediaId\n          personId\n          collectionId\n          mediaType\n          aspectRatio\n          filePath\n          height\n          voteAverage\n          voteCount\n          width\n          languageCode\n          imageType\n        }\n        genres {\n          id\n          name\n        }\n        countries {\n          id\n          countryCode\n          englishName\n        }\n        movieVideo {\n          id\n          mediaId\n          mediaType\n          languageCode\n          countryCode\n          site\n          size\n          official\n          publishedAt\n        }\n      }\n    }\n  }\n": types.MoviesDocument,
    "\n  fragment UserFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n": types.UserFragmentFragmentDoc,
    "\n  \n  query GetCurrentUser {\n    getCurrentUser {\n      ...UserFragment\n    }\n  }\n": types.GetCurrentUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MovieFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n"): (typeof documents)["\n  fragment MovieFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          ...UserFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          ...UserFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      count\n      data {\n        id\n        adult\n        budget\n        homePage\n        streamingOn\n        originalLanguage\n        originalTitle\n        overview\n        popularity\n        releaseDate\n        revenue\n        runtime\n        status\n        tagline\n        title\n        video\n        voteAverage\n        voteCount\n        createdAt\n        imageUrl\n        languages {\n          id\n          languageCode\n          englishName\n        }\n        movieImages {\n          id\n          mediaId\n          personId\n          collectionId\n          mediaType\n          aspectRatio\n          filePath\n          height\n          voteAverage\n          voteCount\n          width\n          languageCode\n          imageType\n        }\n        genres {\n          id\n          name\n        }\n        countries {\n          id\n          countryCode\n          englishName\n        }\n        movieVideo {\n          id\n          mediaId\n          mediaType\n          languageCode\n          countryCode\n          site\n          size\n          official\n          publishedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      count\n      data {\n        id\n        adult\n        budget\n        homePage\n        streamingOn\n        originalLanguage\n        originalTitle\n        overview\n        popularity\n        releaseDate\n        revenue\n        runtime\n        status\n        tagline\n        title\n        video\n        voteAverage\n        voteCount\n        createdAt\n        imageUrl\n        languages {\n          id\n          languageCode\n          englishName\n        }\n        movieImages {\n          id\n          mediaId\n          personId\n          collectionId\n          mediaType\n          aspectRatio\n          filePath\n          height\n          voteAverage\n          voteCount\n          width\n          languageCode\n          imageType\n        }\n        genres {\n          id\n          name\n        }\n        countries {\n          id\n          countryCode\n          englishName\n        }\n        movieVideo {\n          id\n          mediaId\n          mediaType\n          languageCode\n          countryCode\n          site\n          size\n          official\n          publishedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    email\n    firstName\n    id\n    lastName\n    name\n    profileImage\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query GetCurrentUser {\n    getCurrentUser {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  query GetCurrentUser {\n    getCurrentUser {\n      ...UserFragment\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;