import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Link from "next/link";
import styles from "../styles/MovieList.module.css";
import { DELETE_MOVIE } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
const { Meta } = Card;

const MovieCard = ({
  allData,
  movieLists,
  cover,
  width,
  revenueDesc,
  budgetDesc,
  taglineDesc,
  display,
  textAlign,
  height,
}) => {
  const router = useRouter();

  const [deleteMovies, { data: deleteMovieData, loading: loadingMovieData }] =
    useMutation(DELETE_MOVIE);

  if (loadingMovieData) return <h1>loadingMovieData....</h1>;
  if (deleteMovieData) {
    console.log(deleteMovieData, "deleteMovieData");
  }

  const confirm = async (DDI) => {
    console.log(DDI, "DDI");
    try {
      await deleteMovies({
        variables: {
          deleteMovieId: DDI,
        },
      });
      router.push("/movielist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        className={styles.card}
        style={{
          width: { width },
          height: { height },
        }}
        cover={cover}
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
          <Link href={`movieform/${allData.id}`}>
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
          <Meta title={allData.title} description={allData.budget} />
          <Meta description={allData.budget ? allData.title : ""} />
          {revenueDesc}
          {budgetDesc}
          {taglineDesc}
        </div>
      </Card>
    </>
  );
};

export default MovieCard;
