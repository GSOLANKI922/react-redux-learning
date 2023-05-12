import LayOut from "@/component/Layout";
import PersonForm from "@/component/PersonForm";
import { CREATE_PERSON } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const create = () => {
  const router = useRouter();
  const [createPerson, { data, loading }] = useMutation(CREATE_PERSON);

  const onFinish = async (value) => {
    console.log(value);
    let nData = {
      ...value,
      popularity: parseFloat(value.popularity),
      adult: value.adult == 1,
    };
    try {
      await createPerson({
        variables: {
          data: nData,
        },
      });
      router.push("/personlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayOut>
      <PersonForm onFinish={onFinish} loading={loading} name="Create" />
    </LayOut>
  );
};

export default create;
