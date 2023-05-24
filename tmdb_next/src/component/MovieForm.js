import { RollbackOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, DatePicker, Form, Input, Select, Spin, Tooltip } from "antd";
import React from "react";
import styles from "../styles/MovieList.module.css";
import { useRouter } from "next/router";
import { MOVIE_LIST_COUNTRIES, MOVIE_LIST_LANGUAGES } from "@/graphql/query";
import { CONSTATNTS } from "@/Constants";
import LayOut from "./Layout";
import { Radio } from "antd";
import TitleBar from "./TitleBar";
const { Option } = Select;

const MovieForm = ({ initialValues, loadings, onFinish, name, breadCrumb }) => {
  const router = useRouter();

  const { data, loading } = useQuery(MOVIE_LIST_COUNTRIES);

  const { data: languagesData, loading: languagesLoading } =
    useQuery(MOVIE_LIST_LANGUAGES);

  return (
    <LayOut breadCrumb={breadCrumb}>
      <div>
        <TitleBar
          title={name}
          icon={<RollbackOutlined />}
          link="/movielist"
          btnName=""
          TooLtip="Back"
          input="none"
        />
      </div>
      <div className={styles.movieFormContainer}>
        <div>
          {!loadings ? (
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
                label={CONSTATNTS.TITLE}
                name="title"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.TITLE}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.ORIGINALTITLE}
                name="originalTitle"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.ORIGINALTITLE}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.ORIGINALLANGUAGE}
                name="originalLanguage"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.ORIGINALLANGUAGE}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.OVERVIEW}
                name="overview"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.OVERVIEW}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.STATUS}
                name="status"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.STATUS}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.TAGLINE}
                name="tagline"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.TAGLINE}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.RELEASEDATE}
                name="releaseDate"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.RELEASEDATE}`,
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.REVENUE}
                name="revenue"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.REVENUE}`,
                  },
                ]}
                normalize={(val) => +val}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.RUNTIME}
                name="runtime"
                normalize={(val) => +val}
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.RUNTIME}`,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label={CONSTATNTS.BUDGET}
                name="budget"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.BUDGET}`,
                  },
                ]}
                normalize={(val) => +val}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.ADULT}
                name="adult"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.ADULT}`,
                  },
                ]}
              >
                <Radio.Group
                  style={{
                    width: 200,
                    margin: "0 8px",
                  }}
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={CONSTATNTS.COUNTRY_IDS}
                name="countryIds"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.COUNTRY_IDS}`,
                  },
                ]}
              >
                <Select
                  placeholder={`${CONSTATNTS.SELECT} ${CONSTATNTS.COUNTRY_IDS}`}
                  loading={loading ? true : false}
                  style={{
                    width: 200,
                    margin: "0 8px",
                  }}
                >
                  {data &&
                    data.countries?.data?.map((elem) => {
                      return (
                        <Option value={elem.id} key={elem.id}>
                          {elem.englishName} : {elem.countryCode}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>

              <Form.Item
                label={CONSTATNTS.LANGUAGE_IDS}
                name="languageIds"
                rules={[
                  {
                    required: true,
                    message: `${CONSTATNTS.PLEASE_ENTER_MOVIE} ${CONSTATNTS.LANGUAGE_IDS}`,
                  },
                ]}
              >
                <Select
                  placeholder={`${CONSTATNTS.SELECT} ${CONSTATNTS.LANGUAGE_IDS}`}
                  loading={languagesLoading ? true : false}
                  style={{
                    width: 200,
                    margin: "0 8px",
                  }}
                >
                  {languagesData &&
                    languagesData.languages?.data?.map((elem) => {
                      return (
                        <Option value={elem.id} key={elem.id}>
                          {elem.englishName} : {elem.languageCode}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Tooltip
                  title={
                    router.pathname === "/movie/create"
                      ? "ADD MOVIE"
                      : "EDIT MOVIE"
                  }
                >
                  <Button type="primary" htmlType="submit">
                    SAVE
                  </Button>
                </Tooltip>
              </Form.Item>
            </Form>
          ) : (
            <Spin size="large" />
          )}
        </div>
      </div>
    </LayOut>
  );
};

export default MovieForm;
