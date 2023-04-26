import React, { useEffect, useState } from "react";
import CardC from "../component/CardC";
import { useMutation, useQuery } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import PagiNation from "../component/PagiNation";
import { Link } from "react-router-dom";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from "../graphql/mutations";
import MovieForm from "../component/MovieForm";
import NotificationC from "../component/NotificationC";

const MoviesList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadings, setLoadings] = useState(true);
  const [defaultCurrent, setDefaultCurrent] = useState();
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const { loading, error, data, refetch } = useQuery(MOVIE_LIST, {
    variables: {
      sort: {
        field: "createdAt",
      },
      filter: {
        skip: pageNumber,
        limit: 10,
        category: "PLAYING_IN_THEATERS",
      },
    },
  });

  // Add Movie Mutation
  const [
    addMovies,
    { loading: addMoviesLoading, error: addMoviesError, data: createMovieData },
  ] = useMutation(CREATE_MOVIE);

  // Delete Movie Mutation
  const [deleteMovie, { loading: deleteLoading, data: deleteData }] =
    useMutation(DELETE_MOVIE);

  // Edit Movie Mutation
  const [editMovie, { data: editData, loading: editLoading }] = useMutation(
    EDIT_MOVIE,
    {
      variables: {
        updateMovieId: editableData ? editableData.id : "",
      },
    }
  );

  useEffect(() => {
    if (pageNumber !== 1) {
      refetch();
    }
    setTimeout(() => {
      setLoadings(false);
    }, 500);
    // eslint-disable-next-line
  }, [pageNumber]);

  const deleteHandler = async (idd) => {
    try {
      await deleteMovie({
        variables: {
          deleteMovieId: idd,
        },
      });

      setTimeout(() => {
        refetch();
      }, 5000);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (deleteLoading) return <h1>Loading...</h1>;
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error...{error.message}</h1>;
  if (addMoviesLoading) return <h1>addMoviesLoading....</h1>;
  if (addMoviesError) return <h1>addMoviesError: {addMoviesError.message}</h1>;
  if (editLoading) return <h1>Loading...</h1>;

  const changePageNumber = (pNumber) => {
    setPageNumber(pNumber * 10);
    setDefaultCurrent(pNumber);
  };

  const editMovieHandler = (curEditData) => {
    setIsEdit(true);
    setEditableData(curEditData);
  };

  return (
    <div className="movie_list_container">
      <MovieForm
        addMovies={addMovies}
        refetch={refetch}
        editMovie={editMovie}
        editableData={isEdit && editableData}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
      <div className="movie_list_wrapper">
        {deleteData ? (
          <NotificationC
            message={deleteData.deleteMovie.message}
            text="success"
          />
        ) : (
          ""
        )}
        {editData ? (
          <NotificationC
            message={editData.updateMovie.message}
            text="success"
          />
        ) : (
          ""
        )}
        {createMovieData ? (
          <NotificationC
            message={createMovieData.createMovie.message}
            text="success"
          />
        ) : (
          ""
        )}
        {data ? (
          data.listMovies.data.map((movies) => {
            return (
              <Link key={movies.id}>
                <CardC
                  loading={loadings}
                  allData={movies}
                  budget={movies.budget}
                  releaseDate={movies.releaseDate}
                  revenue={movies.revenue}
                  status={movies.status}
                  title={movies.title}
                  id={movies.id}
                  key={movies.id}
                  deleteHandler={deleteHandler}
                  editMovieHandler={editMovieHandler}
                />
              </Link>
            );
          })
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
