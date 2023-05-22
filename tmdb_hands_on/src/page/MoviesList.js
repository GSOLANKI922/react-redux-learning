import React, { useEffect, useState } from "react";
import CardC from "../component/CardC";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/queries";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from "../graphql/mutations";
import MovieForm from "../component/MovieForm";
import NotificationC from "../component/NotificationC";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Spin } from "antd";
const { Option } = Select;

const MoviesList = () => {
  const [loadings, setLoadings] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [curData, setCurData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortdDataByCatagory, setSortdDataByCatagory] = useState("createdAt");

  // Movie List
  const [movieListData, { loading, data, refetch }] = useLazyQuery(MOVIE_LIST, {
    onCompleted: (res) => {
      setCurData(res.listMovies?.data);
    },
    variables: {
      sort: {
        field: sortdDataByCatagory,
      },
      filter: {
        skip: 0,
        limit: 12,
        searchTerm: search ? search : null,
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
  }, [search, sortdDataByCatagory]);

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
      refetch();
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
      setPageNumber((pre) => pre + 1);
      movieListData({
        variables: {
          sort: {
            field: sortdDataByCatagory,
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

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <Select
                placeholder="Sort By Catagory"
                style={{
                  width: 200,
                  margin: "0 8px",
                }}
                defaultValue={sortdDataByCatagory}
                onChange={(event) => setSortdDataByCatagory(event)}
              >
                <Option value="createdAt">CreatedAt</Option>
                <Option value="updatedAt">UpdatedAt</Option>
                <Option value="releaseDate">ReleaseDate</Option>
                <Option value="popularity">Popularity</Option>
                <Option value="voteAverage">VoteAverage</Option>
              </Select>
            </div>
            <div>
              <Input
                name="select"
                placeholder="Search by Name"
                enterButton={false}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value.trim())}
              />
            </div>
          </div>
          <Row>
            {curData &&
              curData?.map((movies) => {
                return (
                  <Col key={movies.id} xs={24} md={8} sm={12} lg={6} xl={6}>
                    <CardC
                      loading={loadings}
                      allData={movies}
                      budget={movies.budget}
                      releaseDate={movies.releaseDate}
                      revenue={movies.revenue}
                      status={movies.status}
                      title={movies.title}
                      id={movies.id}
                      deleteHandler={deleteHandler}
                      editMovieHandler={editMovieHandler}
                    />
                  </Col>
                );
              })}
            {curData.length === 0 && (
              <div style={{ width: "100%", textAlign: "center" }}>
                <h1>No Data Found</h1>
              </div>
            )}
          </Row>
          <div className="infiniteScroll">
            {loading && <Spin size="large" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
