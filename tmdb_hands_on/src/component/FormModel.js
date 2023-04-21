import React from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSION, Edit_PERSION_DETAILS } from "../graphql/mutations";

const FormModel = ({ refetch, persionData, setEdit, edit }) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    knownForDepartment: "",
    gender: "",
  });
  console.log(inputData, "inputData Edit");
  
  useEffect(() => {
    if (edit) {
      setInputData({
        name: persionData.name,
        knownForDepartment: persionData.knownForDepartment,
        gender: persionData.gender,
      });
      showModal();
    }
    // eslint-disable-next-line
  }, [persionData]);

  const [createNewPersion, { loading, error }] = useMutation(CREATE_PERSION);
  const [updatePersion, { loading: persionLoading, data }] =
    useMutation(Edit_PERSION_DETAILS);

  if (loading) return <h1>Loadding..</h1>;
  if (error) return <h1>Errr...{error.message}</h1>;
  if (persionLoading) return <h1>persionLoading..</h1>;
  if (data) {
    console.log(data, "persionLoading");
  }
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    if (edit) {
      try {
        await updatePersion({
          variables: {
            updatePersonId: persionData.id,
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
        await createNewPersion({
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
      <Button type="primary" onClick={showModal} style={{ margin: "20px" }}>
        Add Person
      </Button>
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
