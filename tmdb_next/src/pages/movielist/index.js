import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import { MOVIE_LISTS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Spin, Col, Row, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/MovieList.module.css";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import TitleBar from "@/component/TitleBar";
import { CREATE_FAVORITE_MOVIE, DELETE_MOVIE } from "@/graphql/mutation";
import Notification from "@/component/Notification";

const MovieList = () => {
  const [curMovieList, setCurMovieList] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [movieLists, { loading: movieListsLoading, refetch }] = useLazyQuery(
    MOVIE_LISTS,
    {
      onCompleted: (res) => {
        setCurMovieList(res.movies.data);
        setTotalMovies(res.movies.count);
      },
      variables: {
        filter: {
          skip: 0,
          limit: 9,
          searchTerm: searchText,
        },
        sort: {
          field: "createdAt",
        },
      },
    }
  );

  const [deleteMovies, { data: deleteMovieData, loading: DeleteMovieLoading }] =
    useMutation(DELETE_MOVIE);

  const [
    addFavoriteMovie,
    { data: FavoriteMovieData, loading: FavoriteMovieLoading },
  ] = useMutation(CREATE_FAVORITE_MOVIE, {
    onCompleted: (res) => {
      return (
        <Notification
          message="Add to Favorite Movie"
          description={res.createFavoriteMovie.message}
        />
      );
    },
  });

  useEffect(() => {
    movieLists();
  }, [searchText]);

  const infiniteScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollHeight <= scrollTop + clientHeight + 1 &&
      totalMovies > curMovieList.length
    ) {
      try {
        await movieLists({
          variables: {
            filter: {
              skip: curMovieList.length,
              limit: 9,
            },
            sort: {
              field: "createdAt",
            },
          },
          onCompleted: (res) => {
            setCurMovieList([...curMovieList, ...res.movies.data]);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteMovie = async (DDI) => {
    try {
      await deleteMovies({
        variables: {
          deleteMovieId: DDI,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = (idF) => {
    addFavoriteMovie({
      variables: {
        data: {
          referenceId: idF,
          reference: "MOVIE",
        },
      },
    });
  };

  return (
    <LayOut
      infiniteScroll={infiniteScroll}
      breadCrumb={
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item> / MovieList</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <TitleBar
        title="Movies List"
        icon={<VideoCameraAddOutlined />}
        link="/movie/create"
        btnName="Add Movie"
        TooLtip="Add Video"
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className={styles.movieListContainer}>
        {deleteMovieData && (
          <Notification
            message="Delete Movie"
            description={deleteMovieData.deleteMovie.message}
          />
        )}

        <Row
          style={{
            opacity: DeleteMovieLoading ? 0.3 : 1,
          }}
        >
          {curMovieList &&
            curMovieList.map((movie) => {
              const { budget, id, title } = movie;
              return (
                <Col
                  key={movie.id}
                  xs={{
                    span: 4,
                  }}
                  lg={{
                    span: 6,
                  }}
                >
                  <MovieCard
                    budget={budget}
                    id={id}
                    title={title}
                    allData={movie}
                    movieLists={movieLists}
                    cover={
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    textAlign="start"
                    deleteMovie={deleteMovie}
                    cardLoading={DeleteMovieLoading || FavoriteMovieLoading}
                    addFavorite={addFavorite}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
      <div>
        {(movieListsLoading || DeleteMovieLoading || FavoriteMovieLoading) && (
          <Spin className={styles.spiner} size="large" />
        )}
      </div>
    </LayOut>
  );
};

export default MovieList;
