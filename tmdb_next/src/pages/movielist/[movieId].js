import LayOut from "@/component/Layout";
import { GET_MOVIE_BY_ID_FOR_DETAILS_PAGE } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/MovieList.module.css";
import { Breadcrumb, Button, Card, Carousel, Spin } from "antd";
import MovieCard from "@/component/MovieCard";
import { RollbackOutlined } from "@ant-design/icons";
import TitleBar from "@/component/TitleBar";
const { Meta } = Card;

const MovieDetailsPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, loading } = useQuery(GET_MOVIE_BY_ID_FOR_DETAILS_PAGE, {
    variables: {
      movieId: movieId,
    },
  });

  return (
    <div>
      <LayOut
        breadCrumb={
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item> / MovieList</Breadcrumb.Item>
            <Breadcrumb.Item>
              {data ? data.movie.data.title : ""}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <TitleBar
          title="Movie Details"
          icon={<RollbackOutlined />}
          link="/movielist"
          TooLtip="Back"
        />
        <div className={styles.movie_Detail_Container}>
          {!loading ? (
            <MovieCard
              cover={
                <Carousel autoplay>
                  <div className={styles.Carousel_Images}>
                    <img
                      className={styles.ContentStyle}
                      alt="example"
                      src="https://images.unsplash.com/photo-1566650554919-44ec6bbe2518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwYW5pbWFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                      width={900}
                    />
                  </div>
                  <div className={styles.Carousel_Images}>
                    <img
                      className={styles.ContentStyle}
                      alt="example"
                      src="https://hips.hearstapps.com/hmg-prod/images/cute-baby-animals-1558535060.jpg"
                      width={900}
                    />
                  </div>
                </Carousel>
              }
              allData={data.movie.data}
              width={1000}
              textAlign="center"
              revenueDesc={
                <Meta
                  description={`Revenue : ${
                    data.movie.data.revenue ? data.movie.data.revenue : "-"
                  }`}
                />
              }
              languageDesc={
                <Meta
                  description={`Language:${
                    data.movie.data.originalLanguage
                      ? data.movie.data.originalLanguage
                      : "-"
                  }`}
                />
              }
              taglineDesc={
                <Meta
                  description={`Tagline: ${
                    data.movie.data.tagline ? data.movie.data.tagline : "-"
                  }`}
                />
              }
              releaseDate={
                <Meta
                  description={`ReleaseDate: ${
                    data.movie.data
                      ? new Date(data.movie.data.releaseDate)
                          .toISOString()
                          .slice(0, 10)
                      : "-"
                  }`}
                />
              }
              display="none"
            />
          ) : (
            <Spin size="large" />
          )}
        </div>
      </LayOut>
    </div>
  );
};

export default MovieDetailsPage;
