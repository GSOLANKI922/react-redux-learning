"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MOVIES } from "./graphql/queries";
import {
  ListMoviesSortFields,
  MoviesCategory,
  SortOrder,
} from "@/__generated__/graphql";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Tooltip } from "antd";
import Image from "next/image";

const { Meta } = Card;

const Dashboard = () => {
  const { data, loading } = useQuery(GET_MOVIES, {
    variables: {
      filter: {
        category: MoviesCategory.Latest,
        limit: 5,
        skip: 0,
      },
      sort: {
        field: ListMoviesSortFields.CreatedAt,
        order: SortOrder.Asc,
      },
    },
    fetchPolicy: "network-only",
    onError() {},
  });
  return (
    <div className="movie-card-wrapper">
      <Row gutter={[16, 16]}>
        {data?.movies?.data?.map((item) => {
          return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={item?.id}>
              <Card
                loading={loading}
                className="movie-card"
                cover={
                  <Image
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    width={100}
                    height={150}
                  />
                }
                actions={[
                  <Tooltip title="Delete" key="delete">
                    <DeleteOutlined />
                  </Tooltip>,
                  <Tooltip title="Edit" key="edit">
                    <EditOutlined />
                  </Tooltip>,
                  <Tooltip title="Details" key="ellipsis">
                    <EllipsisOutlined />
                  </Tooltip>,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={item?.title}
                  description={item?.originalTitle}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Dashboard;
