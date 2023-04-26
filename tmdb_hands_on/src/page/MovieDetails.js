import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_MOVIE_BY_ID } from "../graphql/queries";
import { Carousel, Image } from "antd";

const MovieDetails = () => {
  const { idm } = useParams();
  const { loading, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: idm,
    },
  });

  if (loading) return <h1>Loading...</h1>;
  let nData;
  if (data) {
    const { budget, releaseDate, revenue, status, title, id } =
      data?.movie?.data;
    nData = {
      budget,
      releaseDate,
      revenue,
      status,
      title,
      id,
    };
  }

  return (
    <div className="movie_details_container">
      <Carousel autoplay>
        <div>
          <h3>
            <Image
              //
              className="carousel_img"
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </h3>
        </div>
        <div>
          <h3>
            <Image
              className="carousel_img"
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </h3>
        </div>
      </Carousel>
      <h1>Title : {data ? nData.title : "-"}</h1>
      <p>
        <b>ReleaseDate</b>
        {data
          ? ` : ${new Date(nData.releaseDate).toISOString().slice(0, 10)}`
          : "-"}
      </p>
      <p>
        <b>budget</b> : {data ? nData.budget : "-"}.cr
      </p>
      <p>
        <b>Revenue </b> : {data ? nData.revenue : "-"}.cr
      </p>
      <p>
        <b>Status </b> : {data ? nData.status : "-"}.cr
      </p>
    </div>
  );
};

export default MovieDetails;
