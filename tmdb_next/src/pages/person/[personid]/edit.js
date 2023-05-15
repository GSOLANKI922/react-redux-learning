import LayOut from "@/component/Layout";
import Notification from "@/component/Notification";
import PersonForm from "@/component/PersonForm";
import { EDIT_PERSON } from "@/graphql/mutation";
import { PERSON_DETAILS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const edit = () => {
  const router = useRouter();
  const { personid } = router.query;
  const [loading, setLoading] = useState(false);

  const [editPerson, { data: editPersonData, loading: editPersonloading }] =
    useMutation(EDIT_PERSON);

  const [getPersonData, { data, loading: getPersonLoading }] = useLazyQuery(
    PERSON_DETAILS,
    {
      variables: {
        personId: personid,
      },
    }
  );

  useEffect(() => {
    getPersonData();
  }, []);

  const onFinish = async (value) => {
    let nData = {
      ...value,
      adult: value.adult == "1",
      popularity: parseFloat(value.popularity),
    };
    try {
      await editPerson({
        variables: {
          updatePersonId: initialValues.id,
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

  let initialValues;
  if (data) {
    const { adult, gender, id, knownForDepartment, name, popularity } =
      data.person.data;
    initialValues = {
      adult: adult == true ? "1" : "0",
      gender,
      id,
      knownForDepartment,
      name,
      popularity,
    };
  }

  return (
    <LayOut>
      <PersonForm
        initialValues={initialValues}
        loading={editPersonloading || getPersonLoading || loading}
        onFinish={onFinish}
        name="Edit"
      />
      {editPersonData && (
        <Notification
          message="Edit Person"
          description={editPersonData.updatePerson.message}
        />
      )}
    </LayOut>
  );
};

export default edit;
