import { Button, Modal, Space } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const PersionDetailModel = ({ record, editHandler, deleteHandle }) => {
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
      <Button onClick={showModal}>
        <EyeOutlined />
      </Button>
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
          <Button
            danger
            onClick={() => {
              deleteHandle(record.id);
              setIsModalOpen(false);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      </Modal>
    </>
  );
};



export default PersionDetailModel;
