import LayOut from "@/component/Layout";
import PersonForm from "@/component/PersonForm";
import { EDIT_PERSON } from "@/graphql/mutation";
import { PERSON_DETAILS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";


const edit = () => {
  const router = useRouter();
  const { personid } = router.query;

  const [getPersonData, { data, loading }] = useLazyQuery(PERSON_DETAILS, {
    variables: {
      personId: personid,
    },
  });

  const [editPerson, { data: editPersonData, loading: editPersonloading }] =
    useMutation(EDIT_PERSON);

  useEffect(() => {
    getPersonData();
  }, []);

  const onFinish = async (value) => {
    let nData = {
      ...value,
      adult: value.adult == "1",
      popularity: parseFloat(value.popularity),
    };
    console.log(nData, "nData");
    try {
      await editPerson({
        variables: {
          updatePersonId: initialValues.id,
          data: nData,
        },
      });
      router.push("/personlist");
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
        loading={loading || editPersonloading}
        onFinish={onFinish}
        name="Edit"
      />
    </LayOut>
  );
};

export default edit;
