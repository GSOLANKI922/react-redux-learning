import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import Notification from "@/component/Notification";
import TitleBar from "@/component/TitleBar";
import { GET_FAVOIRITE_MOVIES_LISTS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Breadcrumb, Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import styles from "@/styles/MovieList.module.css";
import { DELETE_FAVORITE_MOVIE } from "@/graphql/mutation";

const FavoriteMovies = () => {
  const [GetFavoriteMovies, { data, loading, refetch }] = useLazyQuery(
    GET_FAVOIRITE_MOVIES_LISTS
  );

  const [
    deleteFavoriteMovies,
    { data: deleteFavoriteMoviesData, loading: deleteFavoriteMoviesLoading },
  ] = useMutation(DELETE_FAVORITE_MOVIE);

  useEffect(() => {
    GetFavoriteMovies();
  }, []);

  const deleteMovie = async (idF) => {
    try {
      await deleteFavoriteMovies({
        variables: {
          deleteFavoriteMovieId: idF,
        },
      });
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayOut
      breadCrumb={
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item> / FavoriteMovies</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      {deleteFavoriteMoviesData && (
        <Notification
          message="Delete Movie"
          description={deleteFavoriteMoviesData.deleteFavoriteMovie.message}
        />
      )}
      <TitleBar
        title="Favorite Movies List"
        icon=""
        link=""
        TooLtip=""
        display="none"
      />
      <div
        className={styles.movieListContainer}
        style={{ display: deleteFavoriteMoviesLoading ? "none" : "" }}
      >
        <Row>
          {data &&
            data?.getFavoriteMovies?.map(({ movie, id: favId }) => {
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
                    favId={favId}
                    title={title}
                    allData={movie}
                    cover={
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    textAlign="start"
                    cardLoading={loading}
                    deleteMovie={deleteMovie}
                  />
                </Col>
              );
            })}
          {data?.getFavoriteMovies == 0 && (
            <h1 style={{ textAlign: "center", width: "100%" }}>
              No Data Found
            </h1>
          )}
        </Row>
      </div>
      <div>{loading && <Spin className={styles.spiner} size="large" />}</div>
    </LayOut>
  );
};

export default FavoriteMovies;
