import { Link } from "react-router-dom";

export const HEADER_ITEM = [
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
];

export const BREADCRUMB_HOME_ITEM = [
  {
    title: "Application",
  },
  {
    title: <Link style={{ fontWeight: "bold" }}>Home</Link>,
  },
];
