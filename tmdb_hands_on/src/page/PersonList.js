import React, { useEffect, useState } from "react";
import { PERSION_LIST } from "../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Popconfirm, Space, Table } from "antd";
import FormModel from "../component/FormModel";
import { DELETE_PERSION } from "../graphql/mutations";
import PagiNation from "../component/PagiNation";
import PersionDetailModel from "./PersionDetailModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Column } = Table;

const PersonList = () => {
  const [persionData, setPersionData] = useState();
  const [edit, setEdit] = useState(false);
  const [defaultCurrent, setDefaultCurrent] = useState();
  const [userList, { data, loading, error, refetch }] = useLazyQuery(
    PERSION_LIST,
    {
      variables: {
        sort: {
          field: "updatedAt",
        },
        filter: {
          skip: 0,
          limit: 11,
        },
      },
    }
  );

  useEffect(() => {
    userList();
  }, []);

  const [
    deletePersion,
    { loading: deletePersionLoading, data: deletePersionData },
  ] = useMutation(DELETE_PERSION);

  if (deletePersionLoading) return <h1>Loadding...</h1>;

  if (error) return <h1>Err..{error.message}</h1>;
  if (loading) return <h1>Loading..</h1>;

  if (data) {
    var nData = data.listPersons.data.map(
      ({ id, name, knownForDepartment, gender }) => {
        return {
          id: id,
          key: id,
          name: name,
          knownForDepartment: knownForDepartment,
          gender: gender,
        };
      }
    );
  }

  const deleteHandle = async (deleteID) => {
    try {
      await deletePersion({
        variables: {
          deletePersonId: deleteID,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (editeble) => {
    setPersionData(editeble);
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

  return (
    <div className="table_container">
      <FormModel
        persionData={persionData}
        refetch={refetch}
        edit={edit}
        setEdit={setEdit}
      />
      <Table dataSource={nData} pagination={false}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column
          title="Department"
          dataIndex="knownForDepartment"
          key="knownForDepartment"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button onClick={() => editHandler(record)}>
                <EditOutlined />
              </Button>
              <Popconfirm
                okText="Yes"
                cancelText="No"
                title="Sure to delete?"
                onConfirm={() => deleteHandle(record.id)}
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
              <PersionDetailModel
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
