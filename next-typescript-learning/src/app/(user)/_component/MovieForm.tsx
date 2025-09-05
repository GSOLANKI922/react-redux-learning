"use client";
import React from "react";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Checkbox,
  Button,
  Spin,
  Space,
  Select,
  Row,
  Col,
} from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_LANGUAGES, GET_MOVIE } from "../graphql/queries";
import dayjs from "dayjs";
import { CREATE_MOVIE, UPDATE_MOVIE } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import { LIMIT, ROUTES } from "@/constants";
import CountrieSelect from "./CountrieSelect";

const { TextArea } = Input;
const { Option } = Select;

interface FormValues {
  title: string;
  originalTitle: string;
  originalLanguage: string;
  overview: string;
  status: string;
  tagline: string;
  releaseDate: Date;
  revenue: number;
  runtime: number;
  budget: number;
  adult: boolean;
  countryIds: {
    label: string;
    value: string;
    key: string;
  };
  languageIds: {
    label: string;
    value: string;
    key: string;
  };
}

const MovieForm = ({ slug }: { slug?: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { loading } = useQuery(GET_MOVIE, {
    onCompleted(data) {
      form.setFieldsValue({
        ...data.movie?.data,
        releaseDate: data.movie?.data?.releaseDate
          ? dayjs(data.movie?.data?.releaseDate)
          : null,

        languageIds: {
          value: data.movie?.data?.languages?.[0]?.id,
          label: data.movie?.data?.languages?.[0]?.englishName,
        },
        countryIds: {
          value: data.movie?.data?.countries?.[0]?.id,
          label: data.movie?.data?.countries?.[0]?.englishName,
        },
      });
    },
    skip: !slug,
    variables: {
      movieId: slug || "",
    },
    onError() {},
    fetchPolicy: "network-only",
  });

  const [createMovie] = useMutation(CREATE_MOVIE);
  const [updateMovie] = useMutation(UPDATE_MOVIE);
  const {
    data: countriesData,
    loading: countriesLoading,
    fetchMore: fetchMoreCountriesData,
  } = useQuery(GET_COUNTRIES, {
    fetchPolicy: "network-only",
    onError() {},
  });

  const {
    data: languagesData,
    loading: languagesDataLoading,
    fetchMore: fetchMorelanguagesData,
  } = useQuery(GET_LANGUAGES, {
    fetchPolicy: "network-only",
    onError() {},
  });

  const onFinish = async (values: FormValues) => {
    console.log(values.languageIds.value);

    try {
      if (!slug) {
        const { data: createMovieData } = await createMovie({
          variables: {
            data: {
              ...values,
              languageIds: values.languageIds.value,
              countryIds: values.countryIds.value,
            },
          },
        });
        if (createMovieData) {
          router.replace(ROUTES.MOVIE);
        }
      } else {
        const { data } = await updateMovie({
          variables: {
            updateMovieId: slug,
            data: {
              ...values,
              languageIds: values.languageIds.value,
              countryIds: values.countryIds.value,
            },
          },
        });
        if (data) {
          router.replace(ROUTES.MOVIE);
        }
      }
    } catch (error) {}
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onLanguageScroll = async (event: any) => {
    if (
      languagesData?.languages?.data?.length === languagesData?.languages?.count
    ) {
      return;
    }
    const target = event.target;
    if (
      !languagesDataLoading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      target.scrollTo(0, target.scrollHeight);
      await fetchMorelanguagesData({
        variables: {
          filter: {
            limit: LIMIT,
            skip: languagesData?.languages?.data?.length || 0,
          },
        },
        updateQuery(previousQueryResult, { fetchMoreResult }) {
          return {
            languages: {
              count: previousQueryResult.languages?.count,
              data: [
                ...(previousQueryResult.languages?.data ?? []),
                ...(fetchMoreResult.languages?.data ?? []),
              ],
            },
          };
        },
      });
    }
  };

  const onCountryScroll = async (event: any) => {
    if (
      countriesData?.countries?.data?.length === countriesData?.countries?.count
    ) {
      return;
    }

    const target = event.target;
    if (
      !countriesLoading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      target.scrollTo(0, target.scrollHeight);
      await fetchMoreCountriesData({
        variables: {
          filter: {
            limit: LIMIT,
            skip: countriesData?.countries?.data?.length || 0,
          },
        },
        updateQuery(previousQueryResult, { fetchMoreResult }) {
          return {
            countries: {
              count: previousQueryResult.countries?.count,
              data: [
                ...(previousQueryResult.countries?.data ?? []),
                ...(fetchMoreResult.countries?.data ?? []),
              ],
            },
          };
        },
      });
    }
  };

  console.log(languagesData, "languagesData");

  return (
    <div className="movie-form">
      <Spin spinning={loading} size="large">
        <Space className="movie-action">
          <div />
          <Button type="primary" onClick={() => form.submit()}>
            {!slug ? "Create Movie" : "Update Movie"}
          </Button>
        </Space>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="movie-form-container"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="originalTitle"
            label="Original Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Original Title" />
          </Form.Item>

          <Form.Item
            name="originalLanguage"
            label="Original Language"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Original Language" />
          </Form.Item>

          <Form.Item
            name="overview"
            label="Overview"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Enter Overview" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input placeholder="Enter Status" />
          </Form.Item>

          <Form.Item
            name="tagline"
            label="Tagline"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Tagline" />
          </Form.Item>

          <Form.Item
            name="releaseDate"
            label="Release Date"
            rules={[{ required: true }]}
          >
            <DatePicker showTime placeholder="Select Release Date" />
          </Form.Item>

          <Form.Item
            name="revenue"
            label="Revenue"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter Revenue"
            />
          </Form.Item>

          <Form.Item
            name="runtime"
            label="Runtime"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter Runtime"
            />
          </Form.Item>

          <Form.Item
            name="budget"
            label="Budget"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter Budget" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item
                name="adult"
                label="Adult"
                valuePropName="checked"
                rules={[{ required: true }]}
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="countryIds"
                label="Country ID"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 180 }}
                  loading={loading}
                  onPopupScroll={onCountryScroll}
                  labelInValue
                  placeholder="Please select country"
                >
                  {countriesData?.countries?.data?.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                      {item?.englishName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="languageIds"
                label="Language ID"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 180 }}
                  loading={loading}
                  onPopupScroll={onLanguageScroll}
                  labelInValue
                  placeholder="Please select language"
                >
                  {languagesData?.languages?.data?.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                      {item?.englishName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default MovieForm;
