import React from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { CONSTATNTS } from "@/Constants";
import LayOut from "./Layout";
const { Option } = Select;

const PersonForm = ({initialValues}) => {
  const onFinish = (value) => {
    console.log(value, "vals");
  };
  return (
    <LayOut>
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
          initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "PLEASE_INPUT_YOUR_NAME",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Popularity"
          name="popularity"
          rules={[
            {
              required: true,
              message: "PLEASE_INPUT_YOUR_MOVIE_popularity",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Department"
          name="knownForDepartment"
          rules={[
            {
              required: true,
              message: "PLEASE_INPUT_YOUR_MOVIE_Department",
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
              message: "PLEASE_INPUT_YOUR_MOVIE_Gender",
            },
          ]}
        >
          <Select
            placeholder="SELECT_Gender"
            style={{
              width: 200,
              margin: "0 8px",
            }}
          >
            <Option value="MALE">MALE</Option>
            <Option value="FEMALE">FEMALE</Option>
            <Option value="OTHER">OTHER</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="adult"
          label="Adult"
          rules={[
            {
              required: true,
              message: "Please pick an item!",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="1">Yes</Radio.Button>
            <Radio.Button value="0">No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Edit person
          </Button>
        </Form.Item>
      </Form>
    </LayOut>
  );
};

export default PersonForm;
