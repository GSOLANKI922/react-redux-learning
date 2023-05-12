import MovieForm from "@/component/MovieForm";
import { GET_MOVIE_BY_ID_FOR_EDIT_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import dayjs from "dayjs";
import { EDIT_MOVIE } from "@/graphql/mutation";

const edit = () => {
  const router = useRouter();
  const { addeditmovie } = router.query;

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
      router.push("/movielist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MovieForm
        initialValues={initialValues}
        loadings={getMovieByIdLoading || editMovieLoading}
        onFinish={onFinish}
        name="EDIT MOVIE FORM"
      />
    </div>
  );
};

export default edit;
