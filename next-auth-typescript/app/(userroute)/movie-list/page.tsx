"use client";
import MovieCard from "../_components/MovieCard";
import { useMutation, useQuery } from "@apollo/client";
import { MOVIE_LIST } from "../graphql/query";
import {
  ListMoviesSortFields,
  MoviesCategory,
  SortOrder,
} from "@/.app/__generated__/graphql";
import { useInView, InView } from "react-intersection-observer";
import { useState } from "react";
import { DELETE_MOVIE } from "../graphql/mutation";
import { Card, MenuProps } from "antd";
import Image from "next/image";
import Meta from "antd/es/card/Meta";
import ActionHeader from "../_components/ActionHeader";
import useDebounce from "@/hooks/useDebounce";

interface MovieList {
  adult?: string;
  originalTitle?: string;
  budget?: number;
  countries?: {
    englishName?: string;
  };
  id?: string;
}

interface Pagination {
  isListOrder?: string;
  isField?: string;
  isSearch?: string;
  isCategory?: string;
}

const filedOptions = [
  {
    label: "CreatedAt",
    value: "createdAt",
  },
  {
    label: "Popularity",
    value: "popularity",
  },
  {
    label: "ReleaseDate",
    value: "releaseDate",
  },
  {
    label: "UpdatedAt",
    value: "updatedAt",
  },
  {
    label: "VoteAverage",
    value: "voteAverage",
  },
];

const listOptions = [
  {
    label: "Ascending order",
    value: "ASC",
  },
  {
    label: "Descending Order",
    value: "DESC",
  },
];

const categoryOptions = [
  {
    label: "Latest",
    value: "LATEST",
  },
  {
    label: "PlayingInTheaters",
    value: "PLAYING_IN_THEATERS",
  },
  {
    label: "Popular",
    value: "POPULAR",
  },
  {
    label: "TopRated",
    value: "TOP_RATED",
  },
  {
    label: "Upcoming",
    value: "UPCOMING",
  },
];

export default function MovieList() {
  const [movieList, setMovieList] = useState<MovieList[]>([]);
  const [totalMovie, setTotalMovie] = useState<number>();
  const [isPagination, setIsPagination] = useState<Pagination>({
    isListOrder: SortOrder.Asc,
    isField: ListMoviesSortFields.CreatedAt,
    isSearch: "",
    isCategory: MoviesCategory.Latest,
  });

  const debouncedSearch = useDebounce(isPagination.isSearch);
  const [deleteMovie] = useMutation(DELETE_MOVIE);

  const { loading, fetchMore, refetch } = useQuery(MOVIE_LIST, {
    onCompleted(data) {
      if (data.listMovies?.data) {
        setMovieList(data.listMovies.data as MovieList[]);
        setTotalMovie(data.listMovies.count as number);
      }
    },
    variables: {
      filter: {
        limit: 10,
        category: isPagination.isCategory as MoviesCategory,
        searchTerm: debouncedSearch,
      },
      sort: {
        order: isPagination.isListOrder as SortOrder,
        field: isPagination.isField as ListMoviesSortFields,
      },
    },
    fetchPolicy: "network-only",
    onError() {},
  });

  const infiniteScroll = async (inView: boolean) => {
    const skip = movieList?.length;
    if (skip === totalMovie || !inView) return;
    try {
      const { data } = await fetchMore({
        variables: {
          filter: {
            limit: 10,
            category: isPagination.isCategory as MoviesCategory,
            skip,
            searchTerm: debouncedSearch,
          },
          sort: {
            order: isPagination.isListOrder as SortOrder,
            field: isPagination.isField as ListMoviesSortFields,
          },
        },
      });
      if (data.listMovies?.data) {
        setMovieList((prev) => [
          ...prev,
          ...(data.listMovies?.data as MovieList[]),
        ]);
      }
    } catch (error) {
      //
    }
  };

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
    <div className="person-list">
      <ActionHeader
        href="/movie-list/create-movie"
        buttonName="Create Movie"
        listOptions={listOptions}
        filedOptions={filedOptions}
        setIsPagination={setIsPagination}
        isPagination={isPagination}
        categoryOptions={categoryOptions}
        key={1}
        setMovieList={setMovieList}
      />
      <main className="movie-list-container flex flex-wrap -m-3 h-full overflow-y-scroll">
        {!loading ? (
          movieList?.map((item) => {
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
        <InView
          as="div"
          onChange={(inView) => {
            infiniteScroll(inView);
          }}
          initialInView={false}
          triggerOnce={false}
        />
      </main>
    </div>
  );
}
