import React, { useContext, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Card, Popconfirm } from "antd";
import Link from "next/link";
import styles from "../styles/MovieList.module.css";
import { useRouter } from "next/router";
import { DataContext } from "./Context";

const { Meta } = Card;

const MovieCard = ({
  cover,
  width,
  revenueDesc,
  taglineDesc,
  releaseDate,
  languageDesc,
  textAlign,
  deleteMovie,
  cardLoading,
  addFavorite,
  budget,
  id,
  title,
  favId,
  like,
  pushLink,
}) => {
  const router = useRouter();
  return (
    <>
      <Card
        className={styles.card}
        style={{
          width: width,
          margin: "3rem",
        }}
        cover={cover}
        actions={[
          <Popconfirm
            placement="top"
            title="Are you sure to delete"
            description="Delete the task"
            onConfirm={() =>
              deleteMovie(router.asPath === "/favoritemovies" ? favId : id)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="text">
              <DeleteOutlined key="delete" />
            </Button>
          </Popconfirm>,
          <Link href={`/movie/${id}/edit`}>
            <Button type="text">
              <EditOutlined key="edit" />
            </Button>
          </Link>,
          <Button
            type="text"
            disabled={cardLoading || like}
            onClick={() => addFavorite(id)}
          >
            <HeartFilled key="heart" />
          </Button>,
          <Link href={`movielist/${id ? id : ""}`}>
            <Button type="text">
              <EllipsisOutlined key="ellipsis" />
            </Button>
          </Link>,
        ]}
      >
        <div style={{ textAlign: textAlign }}>
          <Meta title={title} description={`Budget : ${budget}`} />
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
