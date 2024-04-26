"use client";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PERSONS } from "../graphql/queries";
import {
  ListPersonsSortFields,
  PersonCategory,
  SortOrder,
} from "@/__generated__/graphql";
import { Col, Row, Select, Space, Table, Tooltip } from "antd";
import type { GetProp, TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MOVIE_FILTERS, USER_FILTERS } from "@/constants";
import SearchComponent from "../_component/SearchComponent";

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

interface PaginationSettings {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  total: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

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
            <DeleteOutlined
              key="setting"
              size={22}
              className="pointer"
              onClick={() => console.log(value?.id)}
            />
          </Tooltip>
          <Tooltip title="edit">
            <EditOutlined
              key="edit"
              size={22}
              className="pointer"
              onClick={() => console.log(value?.id)}
            />
          </Tooltip>
          <Tooltip title="More Details">
            <EllipsisOutlined
              key="ellipsis"
              size={22}
              className="pointer"
              onClick={() => console.log(value?.id)}
            />
          </Tooltip>
        </Space>
      );
    },
  },
];

const User: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, loading } = useQuery(GET_PERSONS, {
    variables: {
      filter: {
        ...(searchParams.get(USER_FILTERS.Category) && {
          category: searchParams.get(USER_FILTERS.Category) as PersonCategory,
        }),
        limit: 9,
        searchTerm: searchParams.get(USER_FILTERS.Search),
        skip: Number(searchParams.get(USER_FILTERS.Page)) || 0,
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

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Field)}
            style={{ width: "100%" }}
            placeholder="Select field"
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
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
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Order)}
            style={{ width: "100%" }}
            allowClear
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value) {
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
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Select
            defaultValue={searchParams.get(USER_FILTERS.Category)}
            style={{ width: "100%" }}
            placeholder="Select category"
            allowClear
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);

              if (value) {
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
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            xxl={24}
            className="search-component"
          >
            <SearchComponent
              name="Enter search input"
              onPressEnter={(e) => {
                const value = e.currentTarget.value;

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
        </Row>
      </Row>

      <Table
        columns={columns}
        //   rowKey={(record) => record.login.uuid}
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
