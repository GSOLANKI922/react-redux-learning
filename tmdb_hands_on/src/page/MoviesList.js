import React, { useEffect, useState } from "react";
import CardC from "../component/CardC";
import { useMutation, useQuery } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import PagiNation from "../component/PagiNation";
import { Link } from "react-router-dom";
import { DELETE_MOVIE } from "../graphql/mutations";

const MoviesList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadings, setloadings] = useState(true);
  const [defaultCurrent, setDefaultCurrent] = useState();

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
    setTimeout(() => {
      setloadings(false);
    }, 500);
    // eslint-disable-next-line
  }, [pageNumber]);

  const [deleteMovie, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_MOVIE);

  const deleteHandler = async (idd) => {
    try {
      await deleteMovie({
        variables: {
          deleteMovieId: idd,
        },
      });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (deleteLoading) return <h1>Loading...</h1>;
  if (deleteData) {
    console.log(deleteData, "deleteDasta");
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error...{error.message}</h1>;

  const changePageNumber = (pNumber) => {
    setPageNumber(pNumber * 10);
    setDefaultCurrent(pNumber);
  };

  return (
    <div className="movie_list_container">
      <div className="movie_list_wraper">
        {data ? (
          data.listMovies.data.map(
            ({ budget, releaseDate, revenue, status, title, id }) => {
              return (
                <Link key={id}>
                  <CardC
                    loading={loadings}
                    budget={budget}
                    releaseDate={releaseDate}
                    revenue={revenue}
                    status={status}
                    title={title}
                    id={id}
                    key={id}
                    deleteHandler={deleteHandler}
                  />
                </Link>
              );
            }
          )
        ) : (
          <CardC loading={true} />
        )}
      </div>
      <div className="movie_list_pagination">
        <PagiNation
          totalData={data.listMovies.count}
          changePageNumber={changePageNumber}
          defaultCurrent={defaultCurrent}
        />
      </div>
    </div>
  );
};

export default MoviesList;
