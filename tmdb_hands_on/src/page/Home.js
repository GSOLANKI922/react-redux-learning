import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP_MOVIE } from "../graphql/queries";
import CardC from "../component/CardC";
import { useNavigate } from "react-router-dom";
import MovieForm from "../component/MovieForm";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from "../graphql/mutations";
import NotificationC from "../component/NotificationC";
import { LoadingOutlined } from "@ant-design/icons";
import { CONSTATNTS } from "../Constants";

const Home = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(true);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, refetch } = useQuery(GET_TOP_MOVIE, {
    variables: {
      filter: {
        limit: 5,
      },
      sort: {
        field: "popularity",
      },
    },
  });

  const [deleteMovie, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_MOVIE);

  const [addMovies, { loading: createMoviesLoading, data: createMovieData }] =
    useMutation(CREATE_MOVIE);

  const [editMovie, { data: editData, loading: editLoading }] = useMutation(
    EDIT_MOVIE,
    {
      variables: {
        updateMovieId: editableData ? editableData.id : "",
      },
    }
  );

  useEffect(() => {
    let auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    } else {
      <NotificationC message="Login success fully" text="success" />;
    }
    setTimeout(() => {
      setLoadings(false);
    }, 500);
    // eslint-disable-next-line
  }, [data]);

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

  const editMovieHandler = (curEditData) => {
    setIsEdit(true);
    setEditableData(curEditData);
    console.log(curEditData);
  };

  if (deleteLoading || loading || editLoading || createMoviesLoading) {
    return <LoadingOutlined />;
  }

  return (
    <>
      <>
        <MovieForm
          editMovie={editMovie}
          addMovies={addMovies}
          refetch={refetch}
          editableData={isEdit && editableData}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      </>
      <div className="top_5_movie_container">
        <h2 className="top_5_movie"> {CONSTATNTS.TOP_5_MOVIES}</h2>
      </div>
      {deleteData ? (
        <NotificationC
          message={deleteData.deleteMovie.message}
          text="success"
        />
      ) : (
        ""
      )}
      {editData ? (
        <NotificationC message={editData.updateMovie.message} text="success" />
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
      <div className="movie_list_container_1">
        <div className="movie_list_wrapper">
          {data ? (
            data.listMovies.data.map((movies) => {
              return (
                <CardC
                  loading={loadings || createMoviesLoading || loading}
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
              );
            })
          ) : (
            <CardC loading={true} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
