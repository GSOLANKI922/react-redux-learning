import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import { MOVIE_LISTS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Spin, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/MovieList.module.css";
import { DELETE_MOVIE } from "@/graphql/mutation";

const MovieList = () => {
  const [curMovieList, setCurMovieList] = useState([]);
  const [movieLists, { data, loading, refetch }] = useLazyQuery(MOVIE_LISTS, {
    onCompleted: (res) => {
      setCurMovieList([...res.listMovies.data]);
    },
    variables: {
      filter: {
        skip: 0,
        limit: 9,
      },
      sort: {
        field: "createdAt",
      },
    },
  });

  const [deleteMovies, { data: deleteMovieData, loading: loadingMovieData }] =
    useMutation(DELETE_MOVIE);

  useEffect(() => {
    movieLists();
  }, []);

  if (loadingMovieData) return <h1>loadingMovieData..</h1>;
  if (loadingMovieData) {
    console.log(loadingMovieData, "loadingMovieData");
  }

  const infiniteScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight <= scrollTop + clientHeight + 1) {
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
            setCurMovieList([...curMovieList, ...res.listMovies.data]);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const confirm = async (DDI) => {
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

  return (
    <LayOut infiniteScroll={infiniteScroll}>
      <h2 className={styles.title}>Movies List</h2>
      <div className={styles.movieListContainer}>
        <Row>
          {curMovieList &&
            curMovieList.map((movie) => {
              return (
                <Col
                  key={movie.id}
                  xs={{
                    span: 5,
                    offset: 1,
                  }}
                  lg={{
                    span: 6,
                    offset: 2,
                  }}
                >
                  <MovieCard allData={movie} confirm={confirm} />
                </Col>
              );
            })}
        </Row>
      </div>
      <div>{loading && <Spin className={styles.spiner} size="large" />}</div>
    </LayOut>
  );
};

export default MovieList;
