"use client";
import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_MOVIE } from "../graphql/queries";
import {
  ListMoviesSortFields,
  Movie,
  MoviesCategory,
  SortOrder,
} from "@/__generated__/graphql";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Select, Space, Spin, Tooltip } from "antd";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { LIMIT } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { Meta } = Card;

const MovieList = () => {
  // const [filters, setFilters] = useState({
  //   field: ListMoviesSortFields.CreatedAt,
  //   order: SortOrder.Asc,
  //   category: null,
  // });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, fetchMore, networkStatus } = useQuery(GET_MOVIE, {
    variables: {
      filter: {
        // category: filters.category,
        limit: LIMIT,
        skip: 0,
      },
      sort: {
        field: ListMoviesSortFields.CreatedAt,
        order: SortOrder.Asc,
      },
    },
    fetchPolicy: "network-only",
    onError() {},
    notifyOnNetworkStatusChange: true,
  });

  const loading = networkStatus === NetworkStatus.loading;
  const fetching = networkStatus === NetworkStatus.fetchMore;
  const hasMore =
    (data?.movies?.count || 0) > (data?.movies?.data?.length || 0);
  const getMoreData = async (inView: boolean) => {
    if (inView) {
      try {
        fetchMore({
          variables: {
            filter: {
              category: searchParams.get("category") || null,
              limit: LIMIT,
              skip: data?.movies?.data?.length,
            },
            sort: {
              field: searchParams.get("field") || null,
              order: searchParams.get("order") || null,
            },
          },
          updateQuery(previousQueryResult, { fetchMoreResult }) {
            return {
              movies: {
                count:
                  (fetchMoreResult.movies?.data?.length || 0) <= 0
                    ? previousQueryResult.movies?.data?.length
                    : fetchMoreResult.movies?.count,
                data: [
                  ...(previousQueryResult.movies?.data ?? []),
                  ...(fetchMoreResult.movies?.data ?? []),
                ],
              },
            };
          },
        });
      } catch (error) {
        //
      }
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Space wrap>
        <Select
          defaultValue={searchParams.get("field")}
          style={{ width: 120 }}
          placeholder="Select field"
          onChange={(value) => {
            console.log(value, "value");

            const params = new URLSearchParams(searchParams);
            if (value) {
              params.set("field", value);
            } else {
              params.delete("field");
            }

            router.replace(`${pathname}?${params.toString()}`);
          }}
          allowClear
          options={[
            { value: ListMoviesSortFields.CreatedAt, label: "Created At" },
            { value: ListMoviesSortFields.UpdatedAt, label: "Updated At" },
            { value: ListMoviesSortFields.ReleaseDate, label: "Release Date" },
            { value: ListMoviesSortFields.Popularity, label: "Popularity" },
            { value: ListMoviesSortFields.VoteAverage, label: "Vote Average" },
          ]}
        />
        <Select
          defaultValue={searchParams.get("order")}
          style={{ width: 120 }}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
              params.set("order", value);
            } else {
              params.delete("order");
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
          placeholder="Select order"
          allowClear
          options={[
            { value: SortOrder.Asc, label: "Asc" },
            { value: SortOrder.Desc, label: "Desc" },
          ]}
        />
        <Select
          defaultValue={searchParams.get("category")}
          style={{ width: 120 }}
          loading
          placeholder="Select category"
          allowClear
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);

            if (value) {
              params.set("category", value);
            } else {
              params.delete("category");
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
          options={[
            { value: MoviesCategory.Latest, label: "Latest" },
            {
              value: MoviesCategory.PlayingInTheaters,
              label: "Playing In Theaters",
            },
            { value: MoviesCategory.Popular, label: "Popular" },
            { value: MoviesCategory.TopRated, label: "Top Rated" },
            { value: MoviesCategory.Upcoming, label: "Upcoming" },
          ]}
        />
      </Space>
      <div className="movie-card-wrapper">
        <Row gutter={[16, 16]}>
          {!loading &&
            data?.movies?.data?.map((item) => {
              return (
                <Col span={8} key={item?.id}>
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
        {!loading && !fetching && hasMore && (
          <InView
            as="div"
            style={{ height: "5px", backgroundColor: "red" }}
            onChange={(inView) => {
              console.log(inView, "inView");
              if (inView) getMoreData(inView);
            }}
            triggerOnce
          />
        )}
      </div>
    </>
  );
};

export default MovieList;
