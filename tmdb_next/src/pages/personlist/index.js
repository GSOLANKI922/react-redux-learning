import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import LayOut from "@/component/Layout";
import TitleBar from "@/component/TitleBar";
import { Breadcrumb, Button, Popconfirm, Space, Table, Tag } from "antd";
import { PERSON_LISTS } from "@/graphql/query";
import { DELETE_PERSON } from "@/graphql/mutation";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Person.module.css";
import Notification from "@/component/Notification";

let paginationConf = {
  total: 100,
  defaultPageSize: 9,
  current: 1,
  showSizeChanger: false,
};

const PersonList = () => {
  const [ascending, setAscending] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [listPersons, { data, loading, refetch }] = useLazyQuery(PERSON_LISTS, {
    variables: {
      filter: {
        skip: 0,
        limit: 8,
        searchTerm: searchText || null,
      },
      sort: {
        field: "createdAt",
        order: ascending ? "ASC" : "DESC",
      },
    },
  });

  const [
    deletePerson,
    { data: deletePersonData, loading: deletePersonLoading },
  ] = useMutation(DELETE_PERSON);

  useEffect(() => {
    listPersons();
  }, [ascending, searchText]);

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
          skip: 8 * page.current,
          limit: 8,
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

  const personSorted = async () => {
    setAscending(!ascending);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: () => personSorted(),
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
  console.log(searchText, "searchText");
  return (
    <LayOut
      breadCrumb={
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item> / PersonList</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <div style={{ marginBottom: "3rem" }}>
        <TitleBar
          title={`Person List`}
          icon={<UserAddOutlined />}
          link="/person/create"
          btnName="Add Person"
          TooLtip="Add Person"
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>

      <div className={styles.personListContainer}>
        <Table
          scroll={{ y: 470 }}
          loading={loading || deletePersonLoading}
          columns={columns}
          dataSource={personCurData}
          pagination={paginationConf}
          onChange={onPageChangehandler}
        />
      </div>
      {deletePersonData && (
        <Notification
          message="Delete Person"
          description={deletePersonData.deletePerson.message}
        />
      )}
    </LayOut>
  );
};

export default PersonList;
