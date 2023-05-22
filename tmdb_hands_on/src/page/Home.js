import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP_MOVIE } from "../graphql/queries";
import CardC from "../component/CardC";
import { useNavigate } from "react-router-dom";
import { DELETE_MOVIE } from "../graphql/mutations";
import NotificationC from "../component/NotificationC";
import { LoadingOutlined } from "@ant-design/icons";
import { CONSTATNTS } from "../Constants";
import { Col, Row } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(true);
  const { data, loading, refetch } = useQuery(GET_TOP_MOVIE, {
    variables: {
      filter: {
        limit: 5,
      },
      sort: {
        field: "popularity",
      },
    },
  });

  const [deleteMovie, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_MOVIE);

  useEffect(() => {
    let auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    } else {
      <NotificationC message="Login success fully" text="success" />;
    }
    setTimeout(() => {
      setLoadings(false);
    }, 500);
    // eslint-disable-next-line
  }, [data]);

  const deleteHandler = async (idd) => {
    try {
      await deleteMovie({
        variables: {
          deleteMovieId: idd,
        },
      });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (deleteLoading || loading) {
    return <LoadingOutlined />;
  }

  return (
    <>
      <div className="top_5_movie_container">
        <h2 className="top_5_movie"> {CONSTATNTS.TOP_5_MOVIES}</h2>
      </div>
      {deleteData ? (
        <NotificationC
          message={deleteData.deleteMovie.message}
          text="success"
        />
      ) : (
        ""
      )}

      <div className="movie_list_container_1">
        <div className="movie_list_wrapper">
          <Row>
            {data ? (
              data.listMovies.data.map((movies) => {
                return (
                  <Col key={movies.id} xs={24} md={8} sm={12} lg={6} xl={6}>
                    <CardC
                      loading={loadings || loading}
                      allData={movies}
                      budget={movies.budget}
                      releaseDate={movies.releaseDate}
                      revenue={movies.revenue}
                      status={movies.status}
                      title={movies.title}
                      id={movies.id}
                      deleteHandler={deleteHandler}
                    />
                  </Col>
                );
              })
            ) : (
              <CardC loading={true} />
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
