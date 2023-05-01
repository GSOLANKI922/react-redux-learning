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
  const [defaultCurrent, setDefaultCurrent] = useState(1);
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
          limit: 10,
          searchTerm: search || null,
        },
      },
    }
  );

  useEffect(() => {
    userList();
    setTimeout(() => {
      refetch();
    }, 2000);
    // eslint-disable-next-line
  }, [search]);

  const [deletePerson, { loading: deletePersonLoading }] =
    useMutation(DELETE_PERSON);

  if (deletePersonLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Err..{error.message}</h1>;

  let nData;
  if (data) {
    nData = data.listPersons.data.map(
      ({ id, name, knownForDepartment, gender }) => {
        return {
          id,
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
    setDefaultCurrent(page);
    userList({
      variables: {
        filter: {
          skip: (page - 1) * 10,
          limit: 10,
        },
      },
    });
  };

  const changeHandler = (e) => {
    setSeatch(e.target.value.trim());
  };

  return (
    <>
      <div className="person_model_container">
        <Form style={{ width: "30%" }}>
          <Search
            className="person_search"
            placeholder="input search text"
            enterButton={false}
            defaultValue={search}
            onChange={changeHandler}
            loading
          />
        </Form>
        <FormModel
          personData={personData}
          refetch={refetch}
          edit={edit}
          setEdit={setEdit}
        />
      </div>
      <div className="table_container">
        <Table
          dataSource={nData}
          pagination={false}
          loading={loading}
          className="table_wrapper"
        >
          <Column title="Name" dataIndex="name" key="name" align="center" />
          <Column
            title="Gender"
            dataIndex="gender"
            key="gender"
            align="center"
          />
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
                  <Button
                    onClick={() => editHandler(record)}
                    className="button"
                  >
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
                    <Button danger className="button">
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
      </div>
      {data?.listPersons && (
        <PagiNation
          totalData={data?.listPersons?.count}
          defaultCurrent={defaultCurrent}
          changePageNumber={changePageNumber}
        />
      )}
    </>
  );
};

export default PersonList;
