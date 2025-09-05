export const ERROR_CODES = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  INVALID_TOKEN: "INVALID_TOKEN",
  UNAUTHORIZED: "UNAUTHORIZED",
};

import app from "../../package.json";

export const SITE_CONFIG = {
  TITLE: "TMDB",
  DESCRIPTION: "asdf",
  VERSION: app.version,
};

export const COOKIE = {
  token: "accessToken",
  user: "user",
  refreshToken: "refreshToken",
};

export const APP_INFO = {
  title: "Next js Graphql Boilerplate",
  description: "",
  version: app.version,
};

export const GRAPHQL_ERROR_CODES = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",
};

export const ROUTES = {
  LOGIN: "/login",
};
