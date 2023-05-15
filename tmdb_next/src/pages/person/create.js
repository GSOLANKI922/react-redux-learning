import LayOut from "@/component/Layout";
import Notification from "@/component/Notification";
import PersonForm from "@/component/PersonForm";
import { CREATE_PERSON } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const create = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [createPerson, { data, loading: createPersonLoading }] =
    useMutation(CREATE_PERSON);

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
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/personlist");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayOut>
      <PersonForm
        onFinish={onFinish}
        loading={loading || createPersonLoading}
        name="Create"
      />
      {data && (
        <Notification
          message="Create Person"
          description={data.createPerson.message}
        />
      )}
    </LayOut>
  );
};

export default create;
