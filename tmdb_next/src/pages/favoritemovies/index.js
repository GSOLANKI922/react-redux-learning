import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import Notification from "@/component/Notification";
import TitleBar from "@/component/TitleBar";
import { GET_FAVOIRITE_MOVIES_LISTS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Breadcrumb, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/MovieList.module.css";
import { DELETE_FAVORITE_MOVIE } from "@/graphql/mutation";

const FavoriteMovies = () => {
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [favMovies, setFavMovies] = useState([]);
  const [GetFavoriteMovies, { data, loading, refetch }] = useLazyQuery(
    GET_FAVOIRITE_MOVIES_LISTS,
    {
      onCompleted: (res) => {
        setFavMovies(res);
      },
    }
  );

  const [
    deleteFavoriteMovies,
    { data: deleteFavoriteMoviesData, loading: deleteFavoriteMoviesLoading },
  ] = useMutation(DELETE_FAVORITE_MOVIE);

  useEffect(() => {
    GetFavoriteMovies();
  }, []);

  const RemoveFavorite = async (idF) => {
    try {
      await deleteFavoriteMovies({
        variables: {
          deleteFavoriteMovieId: idF,
        },
      });
      setRefetchLoading(true);
      refetch();
      setTimeout(() => {
        setRefetchLoading(false);
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
          message="Remove Favorite Movie"
          description={deleteFavoriteMoviesData.deleteFavoriteMovie.message}
        />
      )}
      <TitleBar
        title="Favorite Movies List"
        icon=""
        link=""
        TooLtip=""
        display="none"
        input="none"
      />
      <div
        className={styles.movieListContainer}
        style={{
          opacity:
            deleteFavoriteMoviesLoading || loading || refetchLoading ? 0.3 : 1,
        }}
      >
        <Row className={styles.movieList_wrapper}>
          {data &&
            favMovies?.getFavoriteMovies?.map(({ movie, id: favId }) => {
              return (
                <Col key={favId} xs={24} md={8} sm={12} lg={6} xl={6}>
                  <MovieCard
                    budget={movie == null ? "-" : movie.budget}
                    id={movie == null ? "-" : movie.id}
                    favId={favId}
                    title={movie == null ? "-" : movie.title}
                    cover={
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    textAlign="start"
                    cardLoading={loading}
                    addFavorite={RemoveFavorite}
                  />
                </Col>
              );
            })}
          {data?.getFavoriteMovies == 0 && (
            <h1
              style={{ textAlign: "center", width: "100%", marginTop: "5rem" }}
            >
              No Data Found
            </h1>
          )}
        </Row>
      </div>
      <div>
        {(loading || refetchLoading) && (
          <Spin
            className={styles.spiner}
            size="large"
            style={{ marginTop: "2rem" }}
          />
        )}
      </div>
    </LayOut>
  );
};

export default FavoriteMovies;
