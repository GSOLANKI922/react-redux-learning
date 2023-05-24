import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Card, Popconfirm } from "antd";
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
  textAlign,
  deleteMovie,
  cardLoading,
  addFavorite,
  budget,
  id,
  title,
  favId,
  like,
  AddFav_Like,
  AddFavioritIconHide,
}) => {
  const router = useRouter();
  return (
    <>
      <Card
        className={styles.card}
        style={{
          width: width,
          margin: "1rem",
        }}
        cover={cover}
        actions={[
          <Popconfirm
            placement="top"
            title="Are you sure to delete"
            description="Delete the task"
            onConfirm={() => deleteMovie(id)}
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
            style={{ display: AddFav_Like || AddFavioritIconHide }}
            type="text"
            disabled={cardLoading || like}
            onClick={() =>
              addFavorite(router.asPath === "/favoritemovies" ? favId : id)
            }
          >
            <HeartFilled key="heart" />
          </Button>,
          <Link
            href={`movielist/${id ? id : ""}`}
            style={{ display: AddFav_Like || AddFavioritIconHide }}
          >
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
