import MovieForm from "@/component/MovieForm";
import { GET_MOVIE_BY_ID_FOR_EDIT_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dayjs from "dayjs";
import { EDIT_MOVIE } from "@/graphql/mutation";
import Notification from "@/component/Notification";
import { Breadcrumb } from "antd";
import Link from "next/link";

const edit = () => {
  const router = useRouter();
  const { addeditmovie } = router.query;
  const [loading, setLoading] = useState(false);

  const { data: getMovieByIdData, loading: getMovieByIdLoading } = useQuery(
    GET_MOVIE_BY_ID_FOR_EDIT_DATA,
    {
      variables: {
        movieId: addeditmovie,
      },
    }
  );

  const [editMovie, { data: editMovieData, loading: editMovieLoading }] =
    useMutation(EDIT_MOVIE);

  let initialValues;
  if (getMovieByIdData) {
    const {
      adult,
      budget,
      countries,
      id,
      languages,
      originalLanguage,
      originalTitle,
      overview,
      releaseDate,
      revenue,
      runtime,
      status,
      tagline,
      title,
    } = getMovieByIdData.movie.data;

    initialValues = {
      adult: adult == true ? "1" : "0",
      budget,
      countries,
      id,
      languages,
      originalLanguage,
      originalTitle,
      overview,
      releaseDate: dayjs(
        new Date(releaseDate).toISOString().slice(0, 10),
        "YYYY/MM/DD"
      ),
      revenue,
      runtime,
      status,
      tagline,
      title,
    };
  }

  const onFinish = async (value) => {
    const nValues = {
      ...value,
      adult: value.adult === "1",
    };
    try {
      editMovie({
        variables: {
          data: nValues,
          updateMovieId: addeditmovie,
        },
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/movielist");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {editMovieData && (
        <Notification
          message="Edit Movie"
          description={editMovieData.updateMovie.message}
        />
      )}
      <MovieForm
        breadCrumb={
          getMovieByIdData && (
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>
                <Link href={`/movielist`}>/ MovieList</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item> Edit</Breadcrumb.Item>
              <Breadcrumb.Item> {initialValues.title}</Breadcrumb.Item>
            </Breadcrumb>
          )
        }
        initialValues={initialValues}
        loadings={getMovieByIdLoading || editMovieLoading}
        onFinish={onFinish}
        name="EDIT MOVIE FORM"
      />
    </div>
  );
};

export default edit;
