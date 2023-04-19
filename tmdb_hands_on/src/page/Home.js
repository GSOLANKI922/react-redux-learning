import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP_MOVIE } from "../graphql/queries";
import Card_C from "../component/Card_C";
import { Link } from "react-router-dom";

const Home = () => {
  const [loadings, setloadings] = useState(true);
  const { data, loading, error } = useQuery(GET_TOP_MOVIE, {
    variables: {
      filter: {
        limit: 5,
      },
      sort: {
        field: "popularity",
      },
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setloadings(false);
    }, 500);
  });
  if (loading) return <h2>Loading..</h2>

  return (
    <div className="movie_list_container">
    <h2 className="top_5_movie"> Top 5 Movies</h2>
      <div className="movie_list_wraper">
        {data ? (
          data.listMovies.data.map(
            ({ budget, releaseDate, revenue, status, title, id }) => {
              return (
                <Link to={`/moviedetails/${id}`}>
                  <Card_C
                    loading={loadings}
                    budget={budget}
                    releaseDate={releaseDate}
                    revenue={revenue}
                    status={status}
                    title={title}
                    id={id}
                    key={id}
                  />
                </Link>
              );
            }
          )
        ) : (
          <Card_C loading={true} />
        )}
      </div>
    </div>
  );
};

export default Home;
