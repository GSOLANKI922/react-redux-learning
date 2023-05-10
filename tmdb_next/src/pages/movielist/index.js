import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import { MOVIE_LISTS } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import { Spin, Col, Row, Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/MovieList.module.css";
import { useRouter } from "next/router";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Link from "next/link";

const MovieList = () => {
  const [curMovieList, setCurMovieList] = useState([]);
  const router = useRouter();
  const [movieLists, { loading }] = useLazyQuery(MOVIE_LISTS, {
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

  useEffect(() => {
    movieLists();
  }, []);

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

  return (
    <LayOut infiniteScroll={infiniteScroll}>
      <div className={styles.titleContainer}>
        <div>
        <Link href={"/movie/create"}>
          <Button
            type="primary"
            icon={<VideoCameraAddOutlined />}
            size="midium"
          >
            Add Movie
          </Button>
          </Link>
        </div>
        <div className={styles.title}>
          <h1 style={{ margin: "0" }}>Movies List</h1>
        </div>
      </div>
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
                  <MovieCard
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
                  />
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
