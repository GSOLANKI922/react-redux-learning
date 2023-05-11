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
    useMutation(EDIT_PERSON, {
      variables: {
        updatePersonId: "cd1e9235-0dda-4eca-ba81-9498a2e1f411",
        data: {
          gender: "OTHER",
          name: "RamLila",
          knownForDepartment: "Karan",
          adult: null,
          popularity: null,
        },
      },
    });

  useEffect(() => {
    getPersonData();
  }, []);

  if (loading) return <h1>loading...</h1>;
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
    <div>
      <PersonForm initialValues={initialValues} />
    </div>
  );
};

export default edit;
