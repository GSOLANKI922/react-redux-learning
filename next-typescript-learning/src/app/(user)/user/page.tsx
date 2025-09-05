"use client";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PERSONS } from "../graphql/queries";
import {
  ListPersonsSortFields,
  PersonCategory,
  SortOrder,
} from "@/__generated__/graphql";
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import type { GetProp, TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROUTES, USER_FILTERS } from "@/constants";
import SearchComponent from "../_component/SearchComponent";
import Link from "next/link";
import { DELETE_PERSON } from "../graphql/mutations";

type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: string;
  gender: string;
  email: string;
  adult: boolean;
}

const User: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [deletePerson] = useMutation(DELETE_PERSON);

  const { data, loading, refetch } = useQuery(GET_PERSONS, {
    variables: {
      filter: {
        ...(searchParams.get(USER_FILTERS.Category) && {
          category: searchParams.get(USER_FILTERS.Category) as PersonCategory,
        }),
        limit: 9,
        searchTerm: searchParams.get(USER_FILTERS.Search),
        skip: searchParams.get(USER_FILTERS.Page)
          ? (Number(searchParams.get(USER_FILTERS.Page)) - 1) * 10
          : 0,
      },
      sort: {
        field:
          (searchParams.get(USER_FILTERS.Field) as ListPersonsSortFields) ||
          ListPersonsSortFields.CreatedAt,
        order:
          (searchParams.get(USER_FILTERS.Order) as SortOrder) || SortOrder.Asc,
      },
    },
    fetchPolicy: "network-only",
    onError() {},
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pagination?.current?.toString() || "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "20%",
      align: "center",
    },
    {
      title: "known For Department",
      dataIndex: "knownForDepartment",
      align: "center",
    },
    {
      title: "adult",
      dataIndex: "adult",
      render: (value) => (value ? "Yes" : "No"),
      align: "center",
    },
    {
      title: "Actions",
      width: "20%",
      align: "center",
      render(value) {
        return (
          <Space size={[18, 18]} wrap>
            <Tooltip title="setting">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={async () => {
                  const { data } = await deletePerson({
                    variables: {
                      deletePersonId: value?.id,
                    },
                  });
                  if (data) {
                    await refetch();
                  }
                }}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined key="setting" size={22} className="pointer" />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="edit">
              <Link href={`${ROUTES.USER}/${value?.id}${ROUTES.EDIT}`}>
                <EditOutlined key="edit" size={22} className="pointer" />
              </Link>
            </Tooltip>
            <Tooltip title="More Details">
              <Link href={`${ROUTES.USER}/${value?.id}${ROUTES.DETAILS}`}>
                <EllipsisOutlined
                  key="ellipsis"
                  size={22}
                  className="pointer"
                />
              </Link>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} className="d-flex py-4">
        {/* <div className="d-flex width-full"> */}
        <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Field)}
            style={{ width: "100%" }}
            placeholder="Select field"
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
                // params.set("page", "1");
                params.set(USER_FILTERS.Field, value);
              } else {
                params.delete(USER_FILTERS.Field);
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            allowClear
            options={[
              { value: ListPersonsSortFields.CreatedAt, label: "Created At" },
              { value: ListPersonsSortFields.UpdatedAt, label: "Updated At" },
              {
                value: ListPersonsSortFields.Name,
                label: "Name",
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Order)}
            style={{ width: "100%" }}
            allowClear
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
                // params.set("page", "1");
                params.set(USER_FILTERS.Order, value);
              } else {
                params.delete(USER_FILTERS.Order);
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            placeholder="Select order"
            options={[
              { value: SortOrder.Asc, label: "Asc" },
              { value: SortOrder.Desc, label: "Desc" },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Category)}
            style={{ width: "100%" }}
            placeholder="Select category"
            allowClear
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
                // params.set("page", "1");
                params.set(USER_FILTERS.Category, value);
              } else {
                params.delete(USER_FILTERS.Category);
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            options={[
              { value: PersonCategory.Trending, label: "Trending" },
              {
                value: PersonCategory.WhatsPopular,
                label: "Whats Popular",
              },
            ]}
          />
        </Col>
        {/* </div> */}
        {/* <div className="d-flex width-full"> */}
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="search-component"
        >
          <SearchComponent
            name="Enter search input"
            getData={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
                params.set(USER_FILTERS.Search, value);
              } else {
                params.delete(USER_FILTERS.Search);
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            defaultValue={searchParams.get(USER_FILTERS.Search) || ""}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={8}
          className="search-component"
        >
          <Button
            type="primary"
            onClick={() => router.replace(`${ROUTES.USER}/add`)}
          >
            Add User
          </Button>
        </Col>
        {/* </div> */}
      </Row>
      <Table
        columns={columns}
        dataSource={data?.listPersons?.data as []}
        pagination={{
          total: data?.listPersons?.count || 0,
          current: Number(searchParams.get("page")) || 0,
          showSizeChanger: false,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default User;
