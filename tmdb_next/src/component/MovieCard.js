import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Link from "next/link";
import styles from "../styles/MovieList.module.css";

const { Meta } = Card;

const MovieCard = ({
  allData,
  cover,
  width,
  revenueDesc,
  taglineDesc,
  releaseDate,
  languageDesc,
  display,
  textAlign,
  height,
  deleteMovie,
  cardLoading,
}) => {
  return (
    <>
      <Card
        loading={cardLoading}
        className={styles.card}
        style={{
          width: { width },
          height: { height },
          margin: "3rem",
        }}
        cover={cover}
        actions={[
          <Popconfirm
            placement="top"
            title="Are you sure to delete"
            description="Delete the task"
            onConfirm={() => deleteMovie(allData.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>,
          <Link href={`/movie/${allData.id}/edit`}>
            <EditOutlined key="edit" />
          </Link>,
          <Link
            href={`movielist/${allData ? allData.id : ""}`}
            style={{ display: display }}
          >
            <EllipsisOutlined key="ellipsis" />
          </Link>,
        ]}
      >
        <div style={{ textAlign: textAlign }}>
          <Meta
            title={allData.title}
            description={`Budget : ${allData.budget}`}
          />

          {revenueDesc}
          {taglineDesc}
          {releaseDate}
          {languageDesc}
        </div>
      </Card>
    </>
  );
};

export default MovieCard;
