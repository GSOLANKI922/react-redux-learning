import React, { useEffect, useState } from "react";
import CardC from "../component/CardC";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from "../graphql/mutations";
import MovieForm from "../component/MovieForm";
import NotificationC from "../component/NotificationC";
import { LoadingOutlined } from "@ant-design/icons";

const MoviesList = () => {
  const [loadings, setLoadings] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [curData, setCurData] = useState([]);

  // Movie List
  const [movieListData, { loading, data, refetch }] = useLazyQuery(MOVIE_LIST, {
    onCompleted: (res) => {
      setCurData([...res.listMovies?.data]);
    },
    variables: {
      sort: {
        field: "createdAt",
      },
      filter: {
        skip: 0,
        limit: 12,
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
    movieListData();
    // eslint-disable-next-line
  }, []);

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

  const editMovieHandler = (curEditData) => {
    setIsEdit(true);
    setEditableData(curEditData);
  };

  const scrollDiv = async (e) => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;
    if (
      scrollHeight <= clientHeight + scrollTop + 1 &&
      curData.length !== data?.listMovies?.count
    ) {
      console.log("refactd");
      setPageNumber((pre) => pre + 1);
      movieListData({
        variables: {
          sort: {
            field: "createdAt",
          },
          filter: {
            skip: curData.length,
            limit: 12,
          },
        },
        onCompleted: (res) => {
          setCurData([...curData, ...res.listMovies?.data]);
        },
      });
    }
  };

  return (
    <>
      <MovieForm
        addMovies={addMovies}
        refetch={refetch}
        editMovie={editMovie}
        editableData={isEdit && editableData}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
      <div className="movie_list_container" onScroll={scrollDiv}>
        <div className="movie_list_wrapper">
          {deleteData && (
            <NotificationC
              message={deleteData.deleteMovie.message}
              text="success"
            />
          )}
          {editData && (
            <NotificationC
              message={editData.updateMovie.message}
              text="success"
            />
          )}
          {createMovieData && (
            <NotificationC
              message={createMovieData.createMovie.message}
              text="success"
            />
          )}

          {deleteLoading ||
            editLoading ||
            (addMoviesLoading && (
              <div className="loading">
                <LoadingOutlined />
              </div>
            ))}

          {curData?.length > 0 ? (
            curData?.map((movies) => {
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
          <div className="infiniteScroll">{loading && <LoadingOutlined />}</div>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
