import MovieForm from "@/component/MovieForm";
import { CREATE_MOVIE } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const create = () => {
  const router = useRouter()
  const [createMovie, { data, loading }] = useMutation(CREATE_MOVIE);

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
      router.push("/movielist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MovieForm
        loadings={loading}
        onFinish={onFinish}
        name="ADD MOVIE FORM"
      />
    </div>
  );
};

export default create;
