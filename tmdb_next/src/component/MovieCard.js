import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Image from "next/image";
const { Meta } = Card;

const MovieCard = ({ allData, confirm }) => {


  return (
    <>
      <Card
        className="card"
        style={{
          width: 300,
          marginBottom: "2rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        cover={
          <Image
            width={262}
            height={159}
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Popconfirm
            placement="top"
            title="Are you sure to delete"
            description="Delete the task"
            onConfirm={() => confirm(allData.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta title={allData.title} description={allData.budget} />
      </Card>
    </>
  );
};

export default MovieCard;
