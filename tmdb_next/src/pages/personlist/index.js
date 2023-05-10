import LayOut from "@/component/Layout";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Table, Tag } from "antd";
import { useLazyQuery } from "@apollo/client";
import { PERSON_LISTS } from "@/graphql/query";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
  },
  {
    title: "Adult",
    key: "adult",
    align: "center",
    dataIndex: "adult",
    render: (_, { adult }) => {
      let color = adult === true ? "green" : "geekblue";
      let tag = adult === true ? "Yes" : "No";
      return (
        <Tag color={color} key={tag}>
          {tag}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    align: "center",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>
          <EditOutlined />
        </Button>
        <Button danger>
          <DeleteOutlined />
        </Button>
        <Button>
          <EyeOutlined />
        </Button>
      </Space>
    ),
  },
];

let paginationConf = {
  total: 100,
  defaultPageSize: 9,
  current: 1,
  showSizeChanger: false,
};

const PersonList = () => {
  const [page, setPage] = useState(1);
  const [listPersons, { data, loading }] = useLazyQuery(PERSON_LISTS, {
    variables: {
      filter: {
        skip: 0,
        limit: 90,
        searchTerm: null,
      },
      sort: {
        field: "createdAt",
      },
    },
  });

  useEffect(() => {
    listPersons();
  }, []);

  let personCurData;
  if (data) {
    personCurData = data?.listPersons?.data?.map((persion) => {
      return {
        key: persion.id,
        name: persion.name,
        gender: persion.gender,
        adult: persion.adult,
      };
    });

    paginationConf = {
      ...paginationConf,
      total: data.listPersons.count,
      current: page.current,
    };
  }

  const onPageChangehandler = (page) => {
    setPage(page);
    listPersons({
      variables: {
        filter: {
          skip: 9 * page.current,
          limit: 9,
        },
      },
    });
  };

  return (
    <LayOut>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={personCurData}
          pagination={paginationConf}
          onChange={onPageChangehandler}
        />
      </div>
    </LayOut>
  );
};

export default PersonList;

// <div style={{textAlign:"center", marginTop:"2rem"}}>
// <Pagination
//   defaultCurrent={page}
//   total={data && data.listPersons.count}
//   onChange={onPageChangehandler}
// />
// </div>
