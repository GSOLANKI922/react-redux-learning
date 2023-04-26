import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TITLE_BY_ID } from "../graphql/queries";

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const { data, loading } = useQuery(GET_TITLE_BY_ID, {
    variables: {
      movieId: pathname.slice(14),
    },
  });
  if (loading) return <h1>Loading..</h1>;
  let title;
  if (data) {
    title = data.movie.data.title;
  }

  const BREADCRUMB_HOME_ITEM = [
    {
      title: "Application",
    },
    {
      title: (
        <Link to={pathname.slice(0, 13)} style={{ fontWeight: "bold" }}>
          <strong>
            {pathname
              .replace("/", "")
              .slice(0, 13)
              .replace(`"/", " " + "/" + " " + ${title}`)}
          </strong>
        </Link>
      ),
    },
  ];

  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
      items={BREADCRUMB_HOME_ITEM}
    />
  );
};

export default BreadCrumb;
