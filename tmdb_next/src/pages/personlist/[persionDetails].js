import LayOut from "@/component/Layout";
import { PERSON_DETAILS } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Descriptions, Spin } from "antd";

const PersionDetails = () => {
  const router = useRouter();
  const { persionDetails } = router.query;

  const [personDetais, { data, loading }] = useLazyQuery(PERSON_DETAILS, {
    variables: {
      personId: persionDetails,
    },
  });

  useEffect(() => {
    personDetais();
  }, []);

  return (
    <LayOut>
      {loading && <Spin size="large" />}
      {data && (
        <Descriptions
          title="User Info"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Descriptions.Item label="UserName">
            {data.person.data.name}
          </Descriptions.Item>
          <Descriptions.Item label="Adult">
            {data.person.data.adult == true ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="gender">
            {data.person.data.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {data.person.data.knownForDepartment}
          </Descriptions.Item>
        </Descriptions>
      )}
    </LayOut>
  );
};

export default PersionDetails;
