"use client";
import { useSession } from "next-auth/react";
import MovieCard from "./_components/MovieCard";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { MOVIE_LIST } from "./graphql/query";
import {
  ListMoviesSortFields,
  MoviesCategory,
  SortOrder,
} from "@/.app/__generated__/graphql";
import getClient from "@/provider/apolloClient";
import { DELETE_MOVIE } from "./graphql/mutation";
import Image from "next/image";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export default function Home() {
  const [deleteMovie] = useMutation(DELETE_MOVIE);
  const { data, loading, refetch } = useQuery(MOVIE_LIST, {
    variables: {
      filter: {
        limit: 5,
        category: MoviesCategory.Latest,
      },
      sort: {
        order: SortOrder.Asc,
        field: ListMoviesSortFields.CreatedAt,
      },
    },
    onError() {},
    fetchPolicy: "network-only",
  });

  async function deleteHandler(deleteMovieId: string) {
    try {
      const { data } = await deleteMovie({
        variables: {
          deleteMovieId,
        },
      });
      if (data) {
        await refetch();
      }
    } catch (error) {}
  }

  return (
    <main className="movie-list-container flex flex-wrap -m-4 h-full overflow-y-scroll">
      {!loading && data?.listMovies?.data ? (
        data.listMovies?.data!.map((item) => {
          return (
            <MovieCard
              originalTitle={item?.originalTitle || ""}
              key={item?.id}
              budget={item?.budget || 0}
              id={item?.id || ""}
              deleteHandler={deleteHandler}
            />
          );
        })
      ) : (
        <Card
          hoverable
          className="movie-card m-4"
          loading={true}
          cover={
            <Image
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              className="h-60 overflow-hidden"
              height={200}
              width={240}
            />
          }
        >
          <Meta />
          <Meta />
        </Card>
      )}
    </main>
  );
}
