import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP_MOVIE } from "../graphql/queries";
import CardC from "../component/CardC";
import { useNavigate } from "react-router-dom";
import MovieForm from "../component/MovieForm";
import { CREATE_MOVIE, DELETE_MOVIE } from "../graphql/mutations";
import NotificationC from "../component/NotificationC";

const Home = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(true);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_TOP_MOVIE, {
    variables: {
      filter: {
        limit: 5,
      },
      sort: {
        field: "popularity",
      },
    },
  });

  const [deleteMovie, { data: deleteData }] = useMutation(DELETE_MOVIE);

  const [addMovies, { loading: addMoviesLoading, data: createMovieData }] =
    useMutation(CREATE_MOVIE);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
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

  if (loading) return <h2>Loading..</h2>;
  if (error) return <h1> Err...Home {error.message}</h1>;
  if (data) {
    console.log(data, "home");
  }

  if (addMoviesLoading) return <h1>addMoviesLoading...Home</h1>;
  if (createMovieData) {
    console.log(createMovieData, "createMovieData");
  }
  const editMovieHandler = (curEditData) => {
    setIsEdit(true);
    setEditableData(curEditData);
  };

  return (
    <div className="movie_list_container">
      {deleteData ? (
        <NotificationC
          message={deleteData.deleteMovie.message}
          text="success"
        />
      ) : (
        ""
      )}
      {/* {editData ? (
          <NotificationC
            message={editData.updateMovie.message}
            text="success"
          />
        ) : (
          ""
        )} */}
      <h2 className="top_5_movie"> Top 5 Movies</h2>
      <MovieForm
        addMovies={addMovies}
        refetch={refetch}
        editableData={isEdit && editableData}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
      <div className="movie_list_wrapper">
        {data ? (
          data.listMovies.data.map((movies) => {
            return (
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
            );
          })
        ) : (
          <CardC loading={true} />
        )}
      </div>
    </div>
  );
};

export default Home;
