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

export const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    width: 300,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: 300,
  },
  {
    title: "Department",
    dataIndex: "knownForDepartment",
    width: 300,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
