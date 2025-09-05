/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n query RefreshToken($data: RefreshTokenInput!) {\n  refreshToken(data: $data) {\n    token\n    user {\n      id\n      email\n      profileImage\n      name\n      firstName\n      lastName\n    }\n  }\n}\n": typeof types.RefreshTokenDocument;
  "\nmutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n  emailPasswordLogIn(data: $data) {\n    message\n    data {\n      token\n      refreshToken\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n}\n ": typeof types.EmailPasswordLogInDocument;
  "\n mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {\n  emailPasswordSignUp(data: $data) {\n    message\n  }\n}\n \n ": typeof types.EmailPasswordSignUpDocument;
  "\n query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {\n  listMovies(filter: $filter, sort: $sort) {\n    count\n    data {\n      id\n      adult\n      budget\n      homePage\n      streamingOn\n      originalLanguage\n      originalTitle\n      overview\n      popularity\n      releaseDate\n      revenue\n      runtime\n      status\n      tagline\n      title\n      video\n      voteAverage\n      voteCount\n      createdAt\n      castAndCrew {\n        alsoKnownAs\n        alsoKnownAs\n      }\n      genres {\n        id\n        name\n      }\n      movieVideo {\n        id\n        countryCode\n      }\n      movieImages {\n        id\n        imageType\n        filePath\n      }\n      movieCollection {\n        name\n        id\n        backdropPath\n      }\n      languages {\n        englishName\n        id\n        languageCode\n      }\n      countries {\n        englishName\n        countryCode\n        id\n      }\n      imageUrl\n    }\n  }\n}\n": typeof types.ListMoviesDocument;
  "\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    profileImage\n    name\n    firstName\n    lastName\n  }\n}\n": typeof types.GetCurrentUserDocument;
  "\n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n": typeof types.RefreshTokenDocument;
};
const documents: Documents = {
  "\n query RefreshToken($data: RefreshTokenInput!) {\n  refreshToken(data: $data) {\n    token\n    user {\n      id\n      email\n      profileImage\n      name\n      firstName\n      lastName\n    }\n  }\n}\n":
    types.RefreshTokenDocument,
  "\nmutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n  emailPasswordLogIn(data: $data) {\n    message\n    data {\n      token\n      refreshToken\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n}\n ":
    types.EmailPasswordLogInDocument,
  "\n mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {\n  emailPasswordSignUp(data: $data) {\n    message\n  }\n}\n \n ":
    types.EmailPasswordSignUpDocument,
  "\n query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {\n  listMovies(filter: $filter, sort: $sort) {\n    count\n    data {\n      id\n      adult\n      budget\n      homePage\n      streamingOn\n      originalLanguage\n      originalTitle\n      overview\n      popularity\n      releaseDate\n      revenue\n      runtime\n      status\n      tagline\n      title\n      video\n      voteAverage\n      voteCount\n      createdAt\n      castAndCrew {\n        alsoKnownAs\n        alsoKnownAs\n      }\n      genres {\n        id\n        name\n      }\n      movieVideo {\n        id\n        countryCode\n      }\n      movieImages {\n        id\n        imageType\n        filePath\n      }\n      movieCollection {\n        name\n        id\n        backdropPath\n      }\n      languages {\n        englishName\n        id\n        languageCode\n      }\n      countries {\n        englishName\n        countryCode\n        id\n      }\n      imageUrl\n    }\n  }\n}\n":
    types.ListMoviesDocument,
  "\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    profileImage\n    name\n    firstName\n    lastName\n  }\n}\n":
    types.GetCurrentUserDocument,
  "\n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n":
    types.RefreshTokenDocument,
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
export function gql(
  source: "\n query RefreshToken($data: RefreshTokenInput!) {\n  refreshToken(data: $data) {\n    token\n    user {\n      id\n      email\n      profileImage\n      name\n      firstName\n      lastName\n    }\n  }\n}\n",
): (typeof documents)["\n query RefreshToken($data: RefreshTokenInput!) {\n  refreshToken(data: $data) {\n    token\n    user {\n      id\n      email\n      profileImage\n      name\n      firstName\n      lastName\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n  emailPasswordLogIn(data: $data) {\n    message\n    data {\n      token\n      refreshToken\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n}\n ",
): (typeof documents)["\nmutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n  emailPasswordLogIn(data: $data) {\n    message\n    data {\n      token\n      refreshToken\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n}\n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {\n  emailPasswordSignUp(data: $data) {\n    message\n  }\n}\n \n ",
): (typeof documents)["\n mutation EmailPasswordSignUp($data: EmailPasswordSignUpData!) {\n  emailPasswordSignUp(data: $data) {\n    message\n  }\n}\n \n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {\n  listMovies(filter: $filter, sort: $sort) {\n    count\n    data {\n      id\n      adult\n      budget\n      homePage\n      streamingOn\n      originalLanguage\n      originalTitle\n      overview\n      popularity\n      releaseDate\n      revenue\n      runtime\n      status\n      tagline\n      title\n      video\n      voteAverage\n      voteCount\n      createdAt\n      castAndCrew {\n        alsoKnownAs\n        alsoKnownAs\n      }\n      genres {\n        id\n        name\n      }\n      movieVideo {\n        id\n        countryCode\n      }\n      movieImages {\n        id\n        imageType\n        filePath\n      }\n      movieCollection {\n        name\n        id\n        backdropPath\n      }\n      languages {\n        englishName\n        id\n        languageCode\n      }\n      countries {\n        englishName\n        countryCode\n        id\n      }\n      imageUrl\n    }\n  }\n}\n",
): (typeof documents)["\n query ListMovies($filter: ListMoviesFilter, $sort: ListMoviesSort) {\n  listMovies(filter: $filter, sort: $sort) {\n    count\n    data {\n      id\n      adult\n      budget\n      homePage\n      streamingOn\n      originalLanguage\n      originalTitle\n      overview\n      popularity\n      releaseDate\n      revenue\n      runtime\n      status\n      tagline\n      title\n      video\n      voteAverage\n      voteCount\n      createdAt\n      castAndCrew {\n        alsoKnownAs\n        alsoKnownAs\n      }\n      genres {\n        id\n        name\n      }\n      movieVideo {\n        id\n        countryCode\n      }\n      movieImages {\n        id\n        imageType\n        filePath\n      }\n      movieCollection {\n        name\n        id\n        backdropPath\n      }\n      languages {\n        englishName\n        id\n        languageCode\n      }\n      countries {\n        englishName\n        countryCode\n        id\n      }\n      imageUrl\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    profileImage\n    name\n    firstName\n    lastName\n  }\n}\n",
): (typeof documents)["\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    profileImage\n    name\n    firstName\n    lastName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n",
): (typeof documents)["\n  query RefreshToken($data: RefreshTokenInput!) {\n    refreshToken(data: $data) {\n      token\n      user {\n        id\n        email\n        profileImage\n        name\n        firstName\n        lastName\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
