import app from "../../package.json";

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
  SIGNIN: "/signin",
  DASHBOARD: "/dashboard",
  MOVIE: "/movie",
  USER: "/user",
};

export const MODULES = {
  LOGIN: "LogIn",
  DASHBOARD: "Dashboard",
  MOVIE: "Movie",
  USER: "User",
  SIGNIN: "SignIn",
};

export const LIMIT = 9;
