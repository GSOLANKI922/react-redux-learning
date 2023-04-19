import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_MOVIE_BY_ID } from "../graphql/queries";
import { Carousel, Image } from "antd";

const MovieDetails = () => {
  const { idm } = useParams();
  const { loading, data, error } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: idm,
    },
  });

  if (loading) return <h1>Loadfing...</h1>;

  const { budget, releaseDate, revenue, status, title, id } = data.movie.data;
  return (
    <div className="movie_detais_container">
      <Carousel autoplay>
        <div>
          <h3>
            <Image
              //
              className="crousel_img"
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </h3>
        </div>
        <div>
          <h3>
            <Image
              // style={contentStyle}
              className="crousel_img"
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </h3>
        </div>
      </Carousel>
      <h1>Title : {title}</h1>
      <p>
        <b>ReleaseDate</b>
        {` : ${new Date(releaseDate).toISOString().slice(0, 10)}`}
      </p>
      <p>
        <b>budget</b> : {budget}.cr
      </p>
      <p>
        <b>Revenue </b> : {revenue}.cr
      </p>
      <p>
        <b>Status </b> : {status}.cr
      </p>
    </div>
  );
};

export default MovieDetails;
