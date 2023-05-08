import LayOut from "@/component/Layout";
import {
  GET_MOVIE_BY_ID,
  MOVIE_LIST_COUNTRIES,
  MOVIE_LIST_LANGUAGES,
} from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import React from "react";
import styles from "../../styles/MovieList.module.css";
import { CREATE_MOVIE } from "@/graphql/mutation";
import { useRouter } from "next/router";
import { CONSTATNTS } from "@/Constants";
const { Option } = Select;

const MovieForm = () => {
  const router = useRouter();
  const { addeditmovie } = router.query;
  console.log(addeditmovie, "addeditmovie");

  const { data, loading } = useQuery(MOVIE_LIST_COUNTRIES);

  const { data: languagesData, loading: languagesLoading } =
    useQuery(MOVIE_LIST_LANGUAGES);

  const [createMovie, { data: createMovieData, loading: createMovieLoading }] =
    useMutation(CREATE_MOVIE);

  const { data: getMovieBtId, loading: getMovieBtLoading } = useQuery(
    GET_MOVIE_BY_ID,
    {
      variables: {
        movieId: addeditmovie,
      },
    }
  );

  if (getMovieBtLoading) return <h1>getMovieBtLoading..</h1>;
  let initialValues;
  if (getMovieBtId) {
    const {
      adult,
      budget,
      countries,
      id,
      languages,
      originalLanguage,
      originalTitle,
      overview,
      releaseDate,
      revenue,
      runtime,
      status,
      tagline,
      title,
    } = getMovieBtId.movie.data;

    initialValues = {
      adult: adult,
      budget: budget,
      countries: countries,
      id: id,
      languages: languages,
      originalLanguage: originalLanguage,
      originalTitle: originalTitle,
      overview: overview,
      releaseDate: null,
      revenue: revenue,
      runtime: runtime,
      status: status,
      tagline: tagline,
      title: title,
    };

  }
  console.log(initialValues, "initialValues");

  const onFinish = async (value) => {
    console.log(value, "val");
    const nValues = {
      ...value,
      adult: value.adult === "1",
    };
    try {
      await createMovie({
        variables: {
          data: nValues,
        },
      });
      router.push("/movielist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayOut>
      <div>
        <h1 className={styles.title}>Add Movies Form</h1>
      </div>
      {createMovieLoading && <Spin size="large" />}
      <div className={styles.movieFormContainer}>
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.TITLE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.ORIGINALTITLE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.ORIGINALLANGUAGE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.OVERVIEW}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.STATUS}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.TAGLINE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.RELEASEDATE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.REVENUE}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.RUNTIME}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.BUDGET}`,
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
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.ADULT}`,
              },
            ]}
          >
            <Select
              placeholder={`${CONSTATNTS.SELECT} ${CONSTATNTS.ADULT}`}
              style={{
                width: 100,
                margin: "0 8px",
              }}
            >
              <Option value="1">{CONSTATNTS.TRUE}</Option>
              <Option value="0">{CONSTATNTS.FALSE}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={CONSTATNTS.COUNTRY_IDS}
            name="countryIds"
            rules={[
              {
                required: true,
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.COUNTRY_IDS}`,
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
              {data ? (
                data.countries?.data?.map((elem) => {
                  return (
                    <Option value={elem.id} key={elem.id}>
                      {elem.englishName} : {elem.countryCode}
                    </Option>
                  );
                })
              ) : (
                <Option value="">
                  <b>{CONSTATNTS.NO_DATA}</b>
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label={CONSTATNTS.LANGUAGE_IDS}
            name="languageIds"
            rules={[
              {
                required: true,
                message: `${CONSTATNTS.PLEASE_INPUT_YOUR_MOVIE} ${CONSTATNTS.LANGUAGE_IDS}`,
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
              {languagesData ? (
                languagesData.languages?.data?.map((elem) => {
                  return (
                    <Option value={elem.id} key={elem.id}>
                      {elem.englishName} : {elem.languageCode}
                    </Option>
                  );
                })
              ) : (
                <Option value="">
                  <b>{CONSTATNTS.NO_DATA}</b>
                </Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayOut>
  );
};

export default MovieForm;
