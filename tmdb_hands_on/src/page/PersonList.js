import React, { useState } from "react";
import { PERSION_LIST } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Space, Table } from "antd";
import FormModel from "../component/FormModel";
import { DELETE_PERSION } from "../graphql/mutations";
import { Link } from "react-router-dom";
import NotificationC from "../component/NotificationC";
const { Column } = Table;

const PersonList = () => {
  const [persionData, setPersionData] = useState("");
  const [edit, setEdit] = useState(false);
  const { data, loading, error, refetch } = useQuery(PERSION_LIST, {
    variables: {
      sort: {
        field: "updatedAt",
      },
      filter: {
        limit: 10,
      },
    },
  });

  const [deletePersion, { loading: deletePersionLoading, data: deletePersionData}] = useMutation(DELETE_PERSION);

  if (deletePersionLoading) return <h1>Loadding...</h1>;
  if(deletePersionData){
    console.log(deletePersionData);
  }

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

  const deleteHandle = (deleteID) => {
    deletePersion({
      variables: {
        deletePersonId: deleteID,
      },
    });
    setTimeout(() => {
      refetch();
    }, 10);
  };

  const editHandler = (editeble) => {
    setPersionData(editeble);
    setEdit(true);
  };

  return (
    <div className="table_container">
    <NotificationC message={deletePersionData.deletePerson.message}/>
      <FormModel persionData={persionData} refetch={refetch} edit={edit} setEdit={setEdit}/>
      <Table dataSource={nData}>
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
              <Link onClick={() => editHandler(record)}>
                Edit {record.lastName}
              </Link>
              <Link onClick={() => deleteHandle(record.id)}>Delete</Link>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default PersonList;
