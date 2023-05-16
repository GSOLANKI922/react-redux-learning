import LayOut from "@/component/Layout";
import { PERSON_DETAILS } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Breadcrumb, Descriptions, Spin } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import TitleBar from "@/component/TitleBar";

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
    <LayOut
      breadCrumb={
        data && <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item> / MovieList</Breadcrumb.Item>
          <Breadcrumb.Item> {data.person.data.name}</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <TitleBar
        title="Person Detais"
        icon={<RollbackOutlined />}
        link="/personlist"
        btnName=""
        TooLtip="Back"
      />
      {loading && <Spin size="large" />}
      {data && (
        <Descriptions
          title="User Info"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "70px",
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
