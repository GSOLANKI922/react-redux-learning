import React from "react";
import { Button, Modal, Form, Input, Select, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON, Edit_PERSON_DETAILS } from "../graphql/mutations";

const FormModel = ({ refetch, personData, setEdit, edit }) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    knownForDepartment: "",
    gender: "",
  });

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
  const [updatePerson, { loading: personLoading }] =
    useMutation(Edit_PERSON_DETAILS);

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Err...{error.message}</h1>;
  if (personLoading) return <h1>personLoading..</h1>;

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    window.location.reload();
    setOpen(false);
  };

  const onFinish = async (values) => {
    if (edit) {
      try {
        await updatePerson({
          variables: {
            updatePersonId: personData.id,
            data: values,
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
        <Button type="primary" onClick={showModal} style={{ margin: "20px" }}>
          Add Person
        </Button>
      </Tooltip>
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
                message: "Please input your name!",
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
                message: "Please input your gender in capital!",
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
                message: "Please input your profession!",
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
    </div>
  );
};

export default FormModel;
