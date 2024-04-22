"use client";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, DatePicker, InputNumber, Select, Button } from "antd";
import { CREATE_MOVIE, UPDATE_MOVIE } from "../graphql/mutation";
import { MOVIE } from "../graphql/query";
import { useRouter } from "next/navigation";
import { openNotificationWithIcon } from "./TostProvider";

const { Option } = Select;

const MovieForm = ({ slug }: { slug?: string }) => {
  const router = useRouter();
  const [createMovie] = useMutation(CREATE_MOVIE);
  const [updateMovie] = useMutation(UPDATE_MOVIE);

  const { data, loading } = useQuery(MOVIE, {
    skip: !slug,
    variables: {
      movieId: slug || "",
    },
  });
  const onFinish = async (value: any) => {
    const nValue = {
      ...value,
      adult: value.adult === "yes",
    };
    try {
      if (slug) {
        const res = await updateMovie({
          variables: {
            updateMovieId: slug || "",
            data: nValue,
          },
        });
        openNotificationWithIcon(
          "success",
          res.data?.updateMovie?.message || ""
        );
      } else {
        const res = await createMovie({
          variables: {
            data: {
              ...nValue,
            },
          },
        });
        openNotificationWithIcon(
          "success",
          res.data?.createMovie?.message || ""
        );
      }
    } catch (error) {
      openNotificationWithIcon("error", error?.message as string);
    } finally {
      router.push("/movie-list");
    }
  };

  return (
    !loading && (
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          ...data?.movie?.data!,
          releaseDate: null,
          adult: data?.movie?.data?.adult ? "yes" : "no",
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Adult" name="adult" valuePropName="checked">
          <Select>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Budget" name="budget">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Original Language" name="originalLanguage">
          <Input />
        </Form.Item>

        <Form.Item label="Original Title" name="originalTitle">
          <Input />
        </Form.Item>

        <Form.Item label="Overview" name="overview">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Release Date" name="releaseDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Revenue" name="revenue">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Runtime" name="runtime">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Option value="released">Released</Option>
            <Option value="upcoming">Upcoming</Option>
            <Option value="post-production">Post Production</Option>
            {/* Add more status options as needed */}
          </Select>
        </Form.Item>

        <Form.Item label="Tagline" name="tagline">
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

export default MovieForm;
