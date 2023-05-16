import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Link from "next/link";
import styles from "../styles/MovieList.module.css";
import { useRouter } from "next/router";

const { Meta } = Card;

const MovieCard = ({
  cover,
  width,
  revenueDesc,
  taglineDesc,
  releaseDate,
  languageDesc,
  display,
  textAlign,
  deleteMovie,
  cardLoading,
  addFavorite,
  like,
  budget,
  id,
  title,
  favId,
}) => {
  const router = useRouter();
  const [idxx, setIdxx] = useState("");
  return (
    <>
      <Card
        loading={cardLoading}
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
            <DeleteOutlined key="delete" />
          </Popconfirm>,
          <Link href={`/movie/${id}/edit`}>
            <EditOutlined key="edit" />
          </Link>,
          <HeartFilled
            key="heart"
            onClick={() => addFavorite(id)}
          />,
          <Link href={`movielist/${id ? id : ""}`} style={{ display: display }}>
            <EllipsisOutlined key="ellipsis" />
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

<HeartOutlined />;
