"use client";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, DatePicker, Radio, Button, notification } from "antd";
import { CREATE_PERSON, UPDATE_PERSON } from "../graphql/mutation";
import { GenderType } from "@/.app/__generated__/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import { openNotificationWithIcon } from "./TostProvider";
import { PERSON } from "../graphql/query";
import dayjs from "dayjs";

interface FormData {
  adult?: string;
  biography?: string;
  birthday?: Date;
  gender?: GenderType;
  knownForDepartment?: string;
  name: string;
  placeOfBirth?: string;
}

const PersonForm = ({ type, slug }: { type: string; slug: string }) => {
  const router = useRouter();

  const [createPerson, { loading }] = useMutation(CREATE_PERSON);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const { data, loading: getFormDataLoading } = useQuery(PERSON, {
    skip: type !== "edit",
    variables: {
      personId: slug,
    },
    fetchPolicy: "network-only",
  });

  const onFinish = async (values: FormData) => {
    if (type !== "edit") {
      try {
        const { data } = await createPerson({
          variables: {
            data: {
              adult: values?.adult === "yes",
              biography: values.biography,
              birthday: values.birthday,
              gender: values.gender,
              knownForDepartment: values.knownForDepartment,
              name: values.name,
              placeOfBirth: values.placeOfBirth,
            },
          },
        });
        if (data?.createPerson && !loading) {
          openNotificationWithIcon(
            "success",
            data?.createPerson?.message || ""
          );
          router.push("/person-list");
        }
      } catch (error) {
        openNotificationWithIcon("error", error?.message as string);
      }
    } else {
      try {
        const { data } = await updatePerson({
          variables: {
            data: {
              adult: values?.adult === "yes",
              biography: values.biography,
              birthday: values.birthday,
              gender: values.gender,
              knownForDepartment: values.knownForDepartment,
              name: values.name,
              placeOfBirth: values.placeOfBirth,
            },
            updatePersonId: slug,
          },
        });

        if (data?.updatePerson && !loading) {
          openNotificationWithIcon(
            "success",
            data?.updatePerson?.message || ""
          );
          router.push("/person-list");
        }
      } catch (error) {
        openNotificationWithIcon("error", error?.message as string);
      }
    }
  };
  return (
    !getFormDataLoading && (
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          adult: data?.person?.data?.adult ? "yes" : "no",
          biography: data?.person?.data?.biography,
          ...(data?.person?.data?.birthday && {
            birthday: dayjs(data?.person?.data?.birthday?.slice(0, 10)),
          }),
          gender: data?.person?.data?.gender,
          knownForDepartment: data?.person?.data?.knownForDepartment,
          name: data?.person?.data?.name,
          placeOfBirth: data?.person?.data?.placeOfBirth,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="birthday"
          rules={[{ required: true, message: "Please select your birthday" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Radio.Group>
            <Radio value="MALE">Male</Radio>
            <Radio value="FEMALE">Female</Radio>
            <Radio value="OTHER">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Adult" name="adult">
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Known For Department" name="knownForDepartment">
          <Input />
        </Form.Item>

        <Form.Item label="Biography" name="biography">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Place of Birth" name="placeOfBirth">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  );
};

export default PersonForm;
