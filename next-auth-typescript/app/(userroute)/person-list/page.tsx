"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PERSONS_LIST } from "../graphql/query";
import {
  ListPersonsQuery,
  ListPersonsSortFields,
  PersonCategory,
  SortOrder,
} from "@/.app/__generated__/graphql";
import { Input, MenuProps, Space, Table, TableProps, Tag } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
  SettingOutlined,
} from "@ant-design/icons";
import { DELETE_PERSON } from "../graphql/mutation";
import ActionHeader from "../_components/ActionHeader";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";

interface Pagination {
  isCurPage?: number;
  isListOrder?: string;
  isField?: string;
  isSearch?: string;
}

const PersonList = () => {
  const [isPagination, setIsPagination] = useState<Pagination>({
    isCurPage: 0,
    isListOrder: "ASC",
    isField: "name",
    isSearch: "",
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Adult",
      dataIndex: "adult",
      key: "adult",
    },
    {
      title: "Department",
      dataIndex: "knownForDepartment",
      key: "knownForDepartment",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <div className="mt-4 w-full flex justify-between -top-1">
              <Link href={`/person-list/${record.id}/edit-person`}>
                <EditTwoTone className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#bfcee3] rounded-md" />
              </Link>
              <DeleteTwoTone
                twoToneColor="#c23c32"
                className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#c29f9f] rounded-md"
                onClick={() => deleteHandler(record?.id)}
              />
              <Link href={`/person-list/${record.id}/person-details`}>
                <EyeTwoTone className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#bfcee3] rounded-md" />
              </Link>
            </div>
          </Space>
        );
      },
    },
  ];

  const filedOptions = [
    {
      label: "CreatedAt",
      value: "createdAt",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "UpdatedAt",
      value: "updatedAt",
    },
  ];

  const listOptions = [
    {
      label: "Ascending order",
      value: "ASC",
    },
    {
      label: "Descending Order",
      value: "DESC",
    },
  ];
  const [deletePerson] = useMutation(DELETE_PERSON);

  const debouncedSearch = useDebounce(isPagination.isSearch);

  const { data, loading, refetch } = useQuery(PERSONS_LIST, {
    variables: {
      filter: {
        limit: 10,
        skip: isPagination.isCurPage && isPagination.isCurPage * 10,
        searchTerm: debouncedSearch,
      },
      sort: {
        order: isPagination.isListOrder as SortOrder,
        field: isPagination.isField as ListPersonsSortFields,
      },
    },
    fetchPolicy: "network-only",
  });
  async function deleteHandler(deletePersonId: string) {
    try {
      const { data } = await deletePerson({
        variables: {
          deletePersonId,
        },
      });
      if (data) {
        await refetch();
      }
    } catch (error) {}
  }

  const handleTableChange: TableProps["onChange"] = (pagination: any) => {
    setIsPagination((prev) => ({
      ...prev,
      isCurPage: pagination?.current - 1,
    }));
  };

  return (
    <div className="person-list">
      <ActionHeader
        buttonName="Create Person"
        filedOptions={filedOptions}
        setIsPagination={setIsPagination}
        isPagination={isPagination}
        listOptions={listOptions}
        href="/person-list/create-person"
      />
      <Table
        columns={columns}
        dataSource={data?.listPersons?.data!}
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          responsive: true,
          total: data?.listPersons?.count || 0,
          showSizeChanger: false,
        }}
        scroll={{ y: 570 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default PersonList;
