import { useEffect, useState } from "react";
import { Button, DatePicker, Modal, Form, Input, Select } from "antd";
import { useQuery } from "@apollo/client";
import { MOVILIST_COUNTRIES, MOVILIST_LANGUAGES } from "../graphql/queries";
const { Option } = Select;

// const initialValues = {
//   adult: "",
//   budget: "",
//   countries: "",
//   id: "",
//   languages: "",
//   originalLanguage: "",
//   originalTitle: "",
//   overview: "",
//   releaseDate: "",
//   revenue: "",
//   runtime: "",
//   status: "",
//   tagline: "",
//   title: "",
// };

const MovieForm = ({
  addMovies,
  refetch,
  editMovie,
  editableData,
  isEdit,
  setIsEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curentEditData, setCurentEditData] = useState();

  const [form] = Form.useForm();

  const { data, loading } = useQuery(MOVILIST_COUNTRIES);

  const { data: languagesData, loading: languagesLoading } =
    useQuery(MOVILIST_LANGUAGES);
console.log(editableData, "editableDataeditableData");
  useEffect(() => {
    if (isEdit) {
        setCurentEditData({
        adult: editableData.adult,
        budget: editableData.budget,
        countries: editableData.countries,
        id: editableData.id,
        languages: editableData.languages,
        originalLanguage: editableData.originalLanguage,
        originalTitle: editableData.originalTitle,
        overview: editableData.overview,
        releaseDate: null,
        revenue: editableData.revenue,
        runtime: editableData.runtime,
        status: editableData.status,
        tagline: editableData.tagline,
        title: editableData.title,
      });
      showModal();
    }
  }, [editableData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const onFinish = async (values) => {
    const nValues = {
      ...values,
      adult: values.adult === "1",
    };
    if (isEdit) {
      try {
        await editMovie({
          variables: {
            data: nValues,
          },
        });
        refetch();
        showModal();
        setIsEdit(false);
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
      } catch (error) {
        console.log(error, "addMovies");
      }
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Movie
      </Button>
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
          initialValues={curentEditData}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your movie Title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="OriginalTitle"
            name="originalTitle"
            rules={[
              {
                required: true,
                message: "Please input your movie OriginalTitle!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="OriginalLanguage"
            name="originalLanguage"
            rules={[
              {
                required: true,
                message: "Please input your movie originalLanguage!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Overview"
            name="overview"
            rules={[
              {
                required: true,
                message: "Please input your movie overview!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your movie Status!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tagline"
            name="tagline"
            rules={[
              {
                required: true,
                message: "Please input your movie Tagline!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="releaseDate"
            label="ReleaseDate"
            rules={[
              {
                required: true,
                message: "Please input your movie ReleaseDate!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Revenue"
            name="revenue"
            rules={[
              {
                required: true,
                message: "Please input your movie Revenue!",
              },
            ]}
            normalize={(val) => +val}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Runtime"
            name="runtime"
            normalize={(val) => +val}
            rules={[
              {
                required: true,
                message: "Please input your movie Runtime!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Budget"
            name="budget"
            rules={[
              {
                required: true,
                message: "Please input your movie budget!",
              },
            ]}
            normalize={(val) => +val}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Adult"
            name="adult"
            rules={[
              {
                required: true,
                message: "Please input your movie adult!",
              },
            ]}
          >
            <Select
              placeholder="Select Adult"
              style={{
                width: 100,
                margin: "0 8px",
              }}
            >
              <Option value="1">TRUE</Option>
              <Option value="0">FALSE</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="CountryIDS"
            name="countryIds"
            rules={[
              {
                required: true,
                message: "Please select your CountryIDS",
              },
            ]}
          >
            <Select
              placeholder="Select CountryIDS"
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
                  <b>No Data</b>
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="LanguageIDS"
            name="languageIds"
            rules={[
              {
                required: true,
                message: "Please select your LanguageIDS",
              },
            ]}
          >
            <Select
              placeholder="Select LanguageIDS"
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
                  <b>No Data</b>
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
              {isEdit ? "Edit" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
