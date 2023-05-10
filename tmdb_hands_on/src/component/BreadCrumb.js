import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TITLE_BY_ID } from "../graphql/queries";

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const { data } = useQuery(GET_TITLE_BY_ID, {
    variables: {
      movieId: pathname.slice(14),
    },
  });
  
  let movieTitle;
  if (data) {
    movieTitle = data?.movie?.data?.title;
  }

  let pathName =
    pathname.slice(0, 13) === "/movieDetails"
      ? "/movieslist"
      : pathname
          .replace("/", "")
          .slice(0, 13)
          .replace(`"/", " " + "/" + " " + ${movieTitle ? movieTitle : ""}`);

  const BREADCRUMB_HOME_ITEM = [
    {
      title: "",
    },
    {
      title: (
        <Link to={pathName} style={{ fontWeight: "bold" }}>
          <strong>
            {pathname.slice(0, 13) === "/movieDetails"
              ? // eslint-disable-next-line
                "movieslist" + ` / ${movieTitle ? movieTitle : ""}`
              : pathname
                  .replace("/", "")
                  .slice(0, 13)
                  .replace(
                    `"/", " " + "/" + " " + ${movieTitle ? movieTitle : ""}`
                  )}
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
