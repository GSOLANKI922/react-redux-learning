import React from "react";
import { Button, Modal, Form, Input, Select, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON, Edit_PERSON_DETAILS } from "../graphql/mutations";
import { PlusOutlined } from "@ant-design/icons";
import NotificationC from "./NotificationC";

const FormModel = ({ refetch, personData, setEdit, edit }) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    if (edit) {
      setInputData({
        name: personData.name,
        knownForDepartment: personData.knownForDepartment,
        gender: personData.gender,
      });
      showModal();
    }
    // eslint-disable-next-line
  }, [personData]);

  const [createNewPerson, { loading, error }] = useMutation(CREATE_PERSON);
  const [updatePerson, { loading: personLoading, data: personUpdateData }] =
    useMutation(Edit_PERSON_DETAILS);

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Err...{error.message}</h1>;
  if (personLoading) return <h1>personLoading..</h1>;
  if (personUpdateData) {
    console.log();
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = async () => {
    try {
      setInputData({});
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    const nData = {
      ...values,
      gender: values.gender.value,
    };
    if (edit) {
      try {
        await updatePerson({
          variables: {
            updatePersonId: personData.id,
            data: nData,
          },
        });
        setInputData("");
        refetch();
        setOpen(false);
        setEdit(false);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setInputData(values);
      try {
        await createNewPerson({
          variables: {
            data: {
              name: values.name,
              knownForDepartment: values.knownForDepartment,
              gender: values.gender.value,
            },
          },
        });
        setOpen(false);
        refetch();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="model_container">
      <Tooltip title="ADD PERSON">
        <Button
          type="primary"
          onClick={showModal}
          className="Add_Person_button"
        >
          Add Person
        </Button>
        <Tooltip title="ADD PERSON">
          <Button
            type="primary"
            onClick={showModal}
            className="Add_Person_button_2"
          >
            <PlusOutlined />
          </Button>
        </Tooltip>
      </Tooltip>
      {personUpdateData ? (
        <NotificationC
          message={personUpdateData.updatePerson.message}
          text="success"
        />
      ) : (
        ""
      )}
      {open && (
        <Modal
          title="Person Form"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={inputData}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please Select your gender!",
                },
              ]}
            >
              <Select
                labelInValue
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "MALE",
                    label: "MALE",
                  },
                  {
                    value: "FEMALE",
                    label: "FEMALE",
                  },
                  {
                    value: "OTHER",
                    label: "OTHER",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Profession"
              name="knownForDepartment"
              rules={[
                {
                  required: true,
                  message: "Please Enter your profession!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default FormModel;
