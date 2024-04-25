"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MOVIE } from "../graphql/queries";
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
import { Avatar, Card, Tooltip } from "antd";
import Image from "next/image";

const { Meta } = Card;

const Dashboard = () => {
  const { data, loading } = useQuery(GET_MOVIE, {
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
      {data?.movies?.data?.map((item) => {
        return (
          <Card
            loading={loading}
            key={item?.id}
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
        );
      })}
    </div>
  );
};

export default Dashboard;
