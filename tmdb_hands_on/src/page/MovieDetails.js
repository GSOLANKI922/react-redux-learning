import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_MOVIE_BY_ID } from "../graphql/queries";
import { Button, Carousel, Image, Tooltip } from "antd";
import { LoadingOutlined, RollbackOutlined } from "@ant-design/icons";
import { CONSTATNTS } from "../Constants";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { idm } = useParams();
  const { loading, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: idm,
    },
  });

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
      <div>
        <Carousel autoplay>
          <div>
            {loading ? (
              <h1>
                <LoadingOutlined />
              </h1>
            ) : (
              ""
            )}
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
        <h1>
          {CONSTATNTS.TITLE} : {data ? nData.title : "-"}
        </h1>
        <p>
          <b>{CONSTATNTS.RELEASEDATE}</b>
          {data
            ? ` : ${new Date(nData.releaseDate).toISOString().slice(0, 10)}`
            : "-"}
        </p>
        <p>
          <b>{CONSTATNTS.BUDGET}</b> : {data ? nData.budget : "-"}.00 cr
        </p>
        <p>
          <b>{CONSTATNTS.REVENUE} </b> : {data ? nData.revenue : "-"}.00 cr
        </p>
        <p>
          <b>{CONSTATNTS.STATUS} </b> : {data ? nData.status : "-"}
        </p>
      </div>
      <Tooltip title="BACK">
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          style={{ marginBottom: "1rem" }}
        >
          <RollbackOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};

export default MovieDetails;
