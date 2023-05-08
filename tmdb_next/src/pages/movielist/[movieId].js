import LayOut from "@/component/Layout";
import { GET_MOVIE_BY_ID } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/MovieList.module.css";
import { Card, Carousel, Spin } from "antd";
import MovieCard from "@/component/MovieCard";
const { Meta } = Card;

const MovieDetailsPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, loading } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: movieId,
    },
  });

  return (
    <div>
      <LayOut>
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
                    />
                  </div>
                  <div className={styles.Carousel_Images}>
                    <img
                      className={styles.ContentStyle}
                      alt="example"
                      src="https://hips.hearstapps.com/hmg-prod/images/cute-baby-animals-1558535060.jpg"
                    />
                  </div>
                </Carousel>
              }
              allData={data.movie.data}
              width="200px"
              height="700px"
              textAlign="center"
              revenueDesc={
                <Meta
                  description={`Revenue : ${
                    data.movie.data.revenue ? data.movie.data.revenue : "-"
                  }`}
                />
              }
              budgetDesc={
                <Meta
                  description={`Budget:${
                    data.movie.data.budget ? data.movie.data.budget : "-"
                  }`}
                />
              }
              taglineDesc={
                <Meta
                  description={`Tagline
     : ${data.movie.data.tagline ? data.movie.data.tagline : "-"}`}
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
