import React, { useEffect, useState } from "react";
import { PERSON_LIST } from "../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Form, Popconfirm, Space, Table, Tooltip } from "antd";
import FormModel from "../component/FormModel";
import { DELETE_PERSON } from "../graphql/mutations";
import PagiNation from "../component/PagiNation";
import PersonDetailModel from "./PersonDetailModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
const { Column } = Table;

const PersonList = () => {
  const [personData, setPersonData] = useState();
  const [edit, setEdit] = useState(false);
  const [defaultCurrent, setDefaultCurrent] = useState();
  const [search, setSeatch] = useState("");
  const [userList, { data, loading, error, refetch }] = useLazyQuery(
    PERSON_LIST,
    {
      variables: {
        sort: {
          field: "updatedAt",
        },
        filter: {
          skip: 0,
          limit: 11,
          searchTerm: search.length >= 1 ? search : null,
        },
      },
    }
  );

  useEffect(() => {
    userList();
    // eslint-disable-next-line
  }, []);

  const [deletePerson, { loading: deletePersonLoading }] =
    useMutation(DELETE_PERSON);

  if (deletePersonLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Err..{error.message}</h1>;
  if (loading) return <h1>Loading..</h1>;

  if (data) {
    var nData = data.listPersons.data.map(
      ({ id, name, knownForDepartment, gender }) => {
        return {
          id: id,
          key: id,
          name: name ? name : "-",
          knownForDepartment: knownForDepartment ? knownForDepartment : "-",
          gender: gender ? gender : "-",
        };
      }
    );
  }

  const deleteHandle = async (deleteID) => {
    try {
      await deletePerson({
        variables: {
          deletePersonId: deleteID,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (curEditData) => {
    setPersonData(curEditData);
    setEdit(true);
  };

  const changePageNumber = (page) => {
    console.log();
    setDefaultCurrent(page);
    userList({
      variables: {
        filter: {
          skip: page * 10,
          limit: 11,
        },
      },
    });
  };

  const onSearch = (value) => {
    setSeatch(value);
    refetch();
  };
  return (
    <div className="table_container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form style={{ width: "30%" }}>
          <Search
            width={500}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            defaultValue={search}
          />
        </Form>
        <FormModel
          personData={personData}
          refetch={refetch}
          edit={edit}
          setEdit={setEdit}
        />
      </div>
      <Table dataSource={nData} pagination={false}>
        <Column title="Name" dataIndex="name" key="name" align="center" />
        <Column title="Gender" dataIndex="gender" key="gender" align="center" />
        <Column
          title="Department"
          dataIndex="knownForDepartment"
          key="knownForDepartment"
          align="center"
        />
        <Column
          align="center"
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button onClick={() => editHandler(record)}>
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Popconfirm
                okText="Yes"
                cancelText="No"
                title="Sure to delete?"
                onConfirm={() => deleteHandle(record.id)}
              >
                <Tooltip title="Delete">
                  <Button danger>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </Popconfirm>
              <PersonDetailModel
                record={record}
                editHandler={editHandler}
                deleteHandle={deleteHandle}
              />
            </Space>
          )}
        />
      </Table>
      <PagiNation
        totalData={data ? data.listPersons.count : 100}
        changePageNumber={changePageNumber}
        defaultCurrent={defaultCurrent}
      />
    </div>
  );
};

export default PersonList;
