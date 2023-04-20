import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP_MOVIE } from "../graphql/queries";
import CardC from "../component/CardC";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    }
    setTimeout(() => {
      setloadings(false);
    }, 500);
  }, [data]);

  if (loading) return <h2>Loading..</h2>;
  if (error) return <h1> Err...Home {error.message}</h1>;
  if (data) {
    console.log(data, "home");
  }

  return (
    <div className="movie_list_container">
      <h2 className="top_5_movie"> Top 5 Movies</h2>
      <div className="movie_list_wraper">
        {data ? (
          data.listMovies.data.map(
            ({ budget, releaseDate, revenue, status, title, id }) => {
              return (
                <Link to={`/moviedetails/${id}`}>
                  <CardC
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
          <CardC loading={true} />
        )}
      </div>
    </div>
  );
};

export default Home;
