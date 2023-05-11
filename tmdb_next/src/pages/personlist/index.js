import LayOut from "@/component/Layout";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import { useLazyQuery, useMutation } from "@apollo/client";
import { PERSON_LISTS } from "@/graphql/query";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { DELETE_PERSON } from "@/graphql/mutation";
import Link from "next/link";
import { useRouter } from "next/router";

let paginationConf = {
  total: 100,
  defaultPageSize: 9,
  current: 1,
  showSizeChanger: false,
};

const PersonList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [listPersons, { data, loading, refetch }] = useLazyQuery(PERSON_LISTS, {
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

  const [
    deletePerson,
    { data: deletePersonData, loading: deletePersonLoading },
  ] = useMutation(DELETE_PERSON);

  useEffect(() => {
    listPersons();
  }, []);

  let personCurData;
  if (data) {
    personCurData = data?.listPersons?.data?.map((persion) => {
      return {
        key: persion.id,
        id: persion.id,
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

  const confirm = async (did) => {
    try {
      await deletePerson({
        variables: {
          deletePersonId: did,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name - b.name,
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
          <Link href={`person/${record.id}/edit`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>
          <Popconfirm
            placement="top"
            title="Are You Sure!"
            description="Confirm Delete"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Link href={`personlist/${record.id}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <LayOut>
      <div>
        <Table
          loading={loading || deletePersonLoading}
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
