import { Button, Modal, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const PersonDetailModel = ({ record, editHandler, deleteHandle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("data");
  };

  return (
    <>
      <Tooltip title="View">
        <Button onClick={showModal}>
          <EyeOutlined />
        </Button>
      </Tooltip>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <p>Name: {record.name}</p>
        <p>
          Department:
          {record.knownForDepartment ? record.knownForDepartment : "No Data"}
        </p>
        <p>Gender: {record.gender ? record.gender : "No Data"}</p>
        <Space size="middle">
          <Button
            onClick={() => {
              editHandler(record);
              setIsModalOpen(false);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteHandle(record.id);
              setIsModalOpen(false);
            }}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      </Modal>
    </>
  );
};

export default PersonDetailModel;
