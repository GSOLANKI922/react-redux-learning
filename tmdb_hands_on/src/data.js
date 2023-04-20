import { Link } from "react-router-dom";
export const HEADER_ITEM_LOGIN = [
  {
    key: 1,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 2,
    label: <Link to="/movieslist">MoviesList</Link>,
  },
  {
    key: 3,
    label: <Link to="/personlist">PersonList</Link>,
  },
  {
    key: 4,
    label: (
      <Link
        to="/login"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000/login";
        }}
      >
        Logout
      </Link>
    ),
  },
];

export const HEADER_ITEM_LOGOUT = [
  {
    key: 1,
    label: <Link to="/login">Login</Link>,
  },
];

export const BREADCRUMB_HOME_ITEM = [
  {
    title: "Application",
  },
  {
    title: (
      <Link to="/" style={{ fontWeight: "bold" }}>
        Home
      </Link>
    ),
  },
];

export const BREADCRUMB_MOVIE_LIST = [
  {
    title: "Application",
  },
  {
    title: <Link style={{ fontWeight: "bold" }}>MovieList</Link>,
  },
];
