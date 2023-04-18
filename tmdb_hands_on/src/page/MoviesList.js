import React, { useEffect, useState } from "react";
import Card_C from "../component/Card_C";
import { useQuery } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import PagiNation from "../component/PagiNation";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, data, refetch } = useQuery(MOVIE_LIST, {
    variables: {
      sort: {
        field: "createdAt",
      },
      filter: {
        skip: pageNumber,
        limit: 10,
      },
    },
  });

  useEffect(() => {
    if (pageNumber !== 1) {
      refetch();
    }
  }, [pageNumber]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error...{error.message}</h1>;

  const changePageNumber = (pNumber) => {
    setPageNumber(pNumber * 10);
  };

  return (
    <div className="movie_list_container">
      <div className="movie_list_wraper">
        {data.listMovies.data.map(
          ({ budget, releaseDate, revenue, status, title, id }) => {
            return (
              <Link to={`/moviedetails/${id}`}>
                <Card_C
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
        )}
      </div>
      <div className="movie_list_pagination">
        <PagiNation
          totalData={data.listMovies.count}
          changePageNumber={changePageNumber}
        />
      </div>
    </div>
  );
};

export default MoviesList;
