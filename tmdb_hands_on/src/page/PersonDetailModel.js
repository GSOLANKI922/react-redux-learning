import { Button, Modal, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { CONSTATNTS } from "../Constants";

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
        <p>
          {CONSTATNTS.NAME}: {record.name}
        </p>
        <p>
          {CONSTATNTS.DEPARTMENT}:
          {record.knownForDepartment ? record.knownForDepartment : "No Data"}
        </p>
        <p>
          {CONSTATNTS.GENDER}: {record.gender ? record.gender : "No Data"}
        </p>
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
