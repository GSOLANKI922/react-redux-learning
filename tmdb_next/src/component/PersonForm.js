import React from "react";
import { Button, Form, Input, Radio, Select, Spin } from "antd";
const { Option } = Select;
import { RollbackOutlined } from "@ant-design/icons";
import TitleBar from "./TitleBar";

const PersonForm = ({ initialValues, loading, onFinish, name }) => {
  return (
    <>
      <TitleBar
        title={`${name} Person`}
        icon={<RollbackOutlined />}
        link="/personlist"
        TooLtip="Back"
        input="none"
      />
      <div style={{ marginTop: "60px", textAlign: "-webkit-center" }}>
        {!loading ? (
          <div>
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
                    message: "Please Enter Your Name",
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
                    message: "please enter movie Popularity" ,
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
                    message: "Please Enter Your Department",
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
                    message: "Please Select Gender",
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
                  {name} person
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Spin size="large" className="spiner" />
        )}
      </div>
    </>
  );
};

export default PersonForm;
