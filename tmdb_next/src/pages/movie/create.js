import MovieForm from "@/component/MovieForm";
import Notification from "@/component/Notification";
import { CREATE_MOVIE } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const create = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [createMovie, { data, loading: createMovieLoading }] =
    useMutation(CREATE_MOVIE);

  const onFinish = async (value) => {
    const nValues = {
      ...value,
      adult: value.adult === "1",
    };
    try {
      await createMovie({
        variables: {
          data: nValues,
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
      {data && (
        <Notification
          message="Add Movie"
          description={data.createMovie.message}
        />
      )}
      <MovieForm
        loadings={createMovieLoading || loading}
        onFinish={onFinish}
        name="ADD MOVIE FORM"
      />
    </div>
  );
};

export default create;
