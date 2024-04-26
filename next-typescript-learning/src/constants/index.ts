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

export const MOVIE_IMAGE =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

export const AVATAR_IMAGE = "https://api.dicebear.com/7.x/miniavs/svg?seed=8";

export const MOVIE_FILTERS = {
  Category: "category",
  Order: "order",
  Field: "field",
};

export const USER_FILTERS = {
  Category: "category",
  Order: "order",
  Field: "field",
  Search: "search",
  Page: "page",
};
