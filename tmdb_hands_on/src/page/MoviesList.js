import React, { useEffect, useState } from "react";
import CardC from "../component/CardC";
import { useMutation, useQuery } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import PagiNation from "../component/PagiNation";
import { Link } from "react-router-dom";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from "../graphql/mutations";
import MovieForm from "../component/MovieForm";
import NotificationC from "../component/NotificationC";
import { LoadingOutlined } from "@ant-design/icons";

const MoviesList = () => {
  // const [skipData, setSkipData] = useState(0);
  const [loadings, setLoadings] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const { loading, data, refetch } = useQuery(MOVIE_LIST, {
    variables: {
      sort: {
        field: "createdAt",
      },
      filter: {
        skip: (pageNumber - 1) * 10,
        limit: 10,
      },
    },
  });

  // Add Movie Mutation
  const [addMovies, { loading: addMoviesLoading, data: createMovieData }] =
    useMutation(CREATE_MOVIE);

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

  if (deleteLoading || loading || editLoading || addMoviesLoading) {
    return <LoadingOutlined />;
  }

  const changePageNumber = async (pNumber) => {
    await setPageNumber(pNumber);
    await refetch();
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
          data.listMovies?.data?.map((movies) => {
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
          totalData={data ? data.listMovies.count : ""}
          changePageNumber={changePageNumber}
          defaultCurrent={pageNumber}
        />
      </div>
    </div>
  );
};

export default MoviesList;
