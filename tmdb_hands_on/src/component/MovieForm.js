import { useEffect, useState } from "react";
import { Button, DatePicker, Modal, Form, Input, Select, Tooltip } from "antd";
import { useQuery } from "@apollo/client";
import { MOVIE_LIST_COUNTRIES, MOVIE_LIST_LANGUAGES } from "../graphql/queries";
import { CONSTATNTS } from "../Constants";
import { Radio } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const MovieForm = ({
  addMovies,
  refetch,
  editMovie,
  editableData,
  isEdit,
  setIsEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState({});
  const [form] = Form.useForm();

  const { data, loading } = useQuery(MOVIE_LIST_COUNTRIES);

  const { data: languagesData, loading: languagesLoading } =
    useQuery(MOVIE_LIST_LANGUAGES);

  useEffect(() => {
    const {
      adult,
      budget,
      countries,
      id,
      languages,
      originalLanguage,
      originalTitle,
      overview,
      revenue,
      runtime,
      status,
      tagline,
      title,
      releaseDate,
    } = editableData;

    if (isEdit) {
      setCurrentEditData({
        adult: adult === true ? "1" : "0",
        budget,
        countries,
        id,
        languages,
        originalLanguage,
        originalTitle,
        overview,
        releaseDate: dayjs(
          new Date(releaseDate).toISOString().slice(0, 10),
          "YYYY/MM/DD"
        ),
        revenue,
        runtime,
        status,
        tagline,
        title,
      });
      showModal();
    }
    // eslint-disable-next-line
  }, [editableData]);

  const showModal = () => {
    // form.setFieldsValue(currentEditData);
    setIsModalOpen(true);
  };

  const handleCancel = async () => {
    try {
      setIsEdit(false);
      setCurrentEditData({});
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error, "handleCancel");
    }
  };

  const onFinish = async (values) => {
    console.log(values, "onFinish", "values");
    const nValues = {
      ...values,
      adult: values.adult === "1",
    };
    console.log(nValues, "nValues");
    if (isEdit) {
      try {
        await editMovie({
          variables: {
            data: nValues,
          },
        });
        setIsEdit(false);
        refetch();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error, "editMovie");
      }
    } else {
      try {
        await addMovies({
          variables: {
            data: nValues,
          },
        });
        refetch();
        setIsModalOpen(false);
        setIsEdit(false);
      } catch (error) {
        console.log(error, "addMovies");
      }
    }
  };

  return (
    <>
      <div className="add_movie_button">
        <Tooltip title="ADD MOVIE">
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginBottom: "1rem" }}
          >
            {CONSTATNTS.ADD_MOVIE}
          </Button>
        </Tooltip>
      </div>

      {isModalOpen && (
        <Modal
          width={900}
          title="Movie Form"
          open={isModalOpen}
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
            form={form}
            initialValues={isEdit ? currentEditData : null}
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
              name="adult"
              label={CONSTATNTS.ADULT}
              rules={[
                {
                  required: true,
                  message: "Please pick an item!",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="1">{CONSTATNTS.YES}</Radio.Button>
                <Radio.Button value="0">{CONSTATNTS.NO}</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={CONSTATNTS.COUNTRY_IDS}
              name="countryIds"
              rules={[
                {
                  required: true,
                  message: `${CONSTATNTS.PLEASE_SELECT} ${CONSTATNTS.COUNTRY}`,
                },
              ]}
            >
              <Select
                placeholder={`${CONSTATNTS.SELECT} ${CONSTATNTS.COUNTRY}`}
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
                  message: `${CONSTATNTS.PLEASE_SELECT} ${CONSTATNTS.LANGUAGE}`,
                },
              ]}
            >
              <Select
                placeholder={`${CONSTATNTS.SELECT} ${CONSTATNTS.LANGUAGE}`}
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
                SAVE
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default MovieForm;
