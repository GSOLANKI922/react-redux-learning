"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
  InputNumber,
  Select,
  Spin,
  Space,
  Row,
  Col,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { GENDER, ROUTES } from "@/constants";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PERSON, UPDATE_PERSON } from "../graphql/mutations";
import { GET_PERSON } from "../graphql/queries";

interface FormData {
  adult: boolean;
  alsoKnownAs: string;
  biography: string;
  deathday: string;
  birthday: string;
  gender: string;
  homePage: string;
  knownForDepartment: string;
  name: string;
  placeOfBirth: string;
  popularity: number;
  profilePath: string;
}

const initialValues: FormData = {
  adult: true,
  alsoKnownAs: "hello",
  biography: "bio",
  deathday: "22/05/2012",
  birthday: "02/05/2013",
  gender: "MALE",
  homePage: "no",
  knownForDepartment: "knownForDepartment",
  name: "name",
  placeOfBirth: "placeOfBirth",
  popularity: 0.5,
  profilePath:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
};

const UserForm = ({ slug }: { slug?: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [createPerson, { loading }] = useMutation(CREATE_PERSON);
  const [updatePerson, { loading: updatePersonLoading }] =
    useMutation(UPDATE_PERSON);
  const { loading: getPersonDataLoading } = useQuery(GET_PERSON, {
    onCompleted(data) {
      form.setFieldsValue({
        ...data.person?.data,
        birthday: data.person?.data?.birthday
          ? dayjs(data.person?.data?.birthday)
          : null,
        deathday: data.person?.data?.deathday
          ? dayjs(data.person?.data?.deathday)
          : null,
      });
    },
    skip: !slug,
    variables: {
      personId: slug || "",
    },
  });

  const onFinish = async (values: FormData) => {
    try {
      if (!slug) {
        const { data } = await createPerson({
          variables: {
            data: values,
          },
        });
        if (data) {
          router.replace(ROUTES.USER);
        }
      } else {
        const { data } = await updatePerson({
          variables: {
            updatePersonId: slug,
            data: values,
          },
        });
        if (data) {
          router.replace(ROUTES.USER);
        }
      }
    } catch (error) {
      //
    }
  };

  return (
    <Spin
      tip="Loading..."
      spinning={loading || getPersonDataLoading}
      className="user-form"
    >
      <div className="actions">
        <div />
        <Space>
          <Button type="primary" onClick={() => form.submit()}>
            {slug ? "Update" : "Cretae"}
          </Button>
          <Button type="default" onClick={() => router.back()}>
            Cancle
          </Button>
        </Space>
      </div>
      <Form
        form={form}
        layout="vertical"
        // initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="alsoKnownAs"
          label="Also Known As"
          rules={[
            { required: true, message: "Please input the alternative name!" },
          ]}
        >
          <Input placeholder="Also Known As" />
        </Form.Item>

        <Form.Item
          name="biography"
          label="Biography"
          rules={[{ required: true, message: "Please input the biography!" }]}
        >
          <Input.TextArea rows={4} placeholder="Biography" />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[
                { required: true, message: "Please select the birthday!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="deathday" label="Deathday">
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please input the gender!" }]}
            >
              <Select
                defaultValue="MALE"
                style={{ width: 120 }}
                options={GENDER}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="popularity"
              label="Popularity"
              rules={[
                { required: true, message: "Please input the popularity!" },
              ]}
            >
              <InputNumber min={0} max={10} step={0.1} defaultValue={0} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="adult"
              label="Adult"
              valuePropName="checked"
              rules={[
                { required: true, message: "Please confirm if adult or not!" },
              ]}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="knownForDepartment"
          label="Known For Department"
          rules={[
            {
              required: true,
              message: "Please input the known for department!",
            },
          ]}
        >
          <Input placeholder="Known For Department" />
        </Form.Item>

        <Form.Item
          name="placeOfBirth"
          label="Place Of Birth"
          rules={[
            { required: true, message: "Please input the place of birth!" },
          ]}
        >
          <Input placeholder="Place Of Birth" />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserForm;
