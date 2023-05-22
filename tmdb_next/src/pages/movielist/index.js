import LayOut from "@/component/Layout";
import MovieCard from "@/component/MovieCard";
import { MOVIE_LISTS } from "@/graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Spin, Col, Row, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/MovieList.module.css";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import TitleBar from "@/component/TitleBar";
import { CREATE_FAVORITE_MOVIE, DELETE_MOVIE } from "@/graphql/mutation";
import Notification from "@/component/Notification";
import { MOVIE_CATAGORY } from "@/Constants";

const MovieList = () => {
  const [curMovieList, setCurMovieList] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectByCategory, setSelectByCategory] = useState("createdAt");
  console.log("curMovieList", curMovieList);
  const [movieLists, { loading: movieListsLoading, refetch, fetchMore , networkStatus}] =
    useLazyQuery(MOVIE_LISTS, {
      fetchPolicy: 'network-only',
      onCompleted: async (res) => {
        console.log("complete");
        setCurMovieList([...res.movies.data]);
        setTotalMovies(res.movies.count);
      },
      notifyOnNetworkStatusChange: true,
      variables: {
        filter: {
          skip: 0,
          limit: 9,
          searchTerm: searchText ? searchText : null,
        },
        sort: {
          field: selectByCategory,
        },
      },
    });

    const isLoading = networkStatus === 1;
    const isFetchingMore = networkStatus === 3;


  const [deleteMovies, { data: deleteMovieData, loading: DeleteMovieLoading }] =
    useMutation(DELETE_MOVIE);

  const [
    addFavoriteMovie,
    { data: FavoriteMovieData, loading: FavoriteMovieLoading },
  ] = useMutation(CREATE_FAVORITE_MOVIE, {
    onCompleted: (res) => {
      return (
        <Notification
          message="Add to Favorite Movie"
          description={res.createFavoriteMovie.message}
        />
      );
    },
  });

  useEffect(() => {
    movieLists();
  }, [searchText, selectByCategory]);

  const infiniteScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (
      scrollHeight <= scrollTop + clientHeight + 5 &&
      totalMovies !== curMovieList.length
      && !isLoading
      && !isFetchingMore
    ) {
      try {
          console.log( totalMovies , curMovieList.length)
        const { data } = await fetchMore({
          variables: {
            filter: {
              skip: curMovieList.length,
              limit: 9,
              searchTerm: searchText ? searchText : null,
            },
            sort: {
              field: selectByCategory,
            },
            
          },
          updateQuery: () => null
        });
       
        setCurMovieList((pre) => {
          console.log("dd", [...pre, ...data.movies.data])
          return [...pre, ...data.movies.data];
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(totalMovies, "totalMovies");

  const deleteMovie = async (DDI) => {
    try {
      await deleteMovies({
        variables: {
          deleteMovieId: DDI,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = (idF) => {
    addFavoriteMovie({
      variables: {
        data: {
          referenceId: idF,
          reference: "MOVIE",
        },
      },
    });
  };

  return (
    <LayOut
      breadCrumb={
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item> / MovieList</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <div style={{ width: "100%" }}>
        <TitleBar
          title="Movies List"
          icon={<VideoCameraAddOutlined />}
          link="/movie/create"
          btnName="Add Movie"
          TooLtip="Add Video"
          searchText={searchText}
          setSearchText={setSearchText}
          sorted={MOVIE_CATAGORY}
          selectByCategory={selectByCategory}
          setSelectByCategory={setSelectByCategory}
        />
      </div>
      <div className={styles.movieListContainer}>
        {deleteMovieData && (
          <Notification
            message="Delete Movie"
            description={deleteMovieData.deleteMovie.message}
          />
        )}
        <Row
          className={styles.movieList_wrapper}
          style={{
            opacity: DeleteMovieLoading ? 0.3 : 1,
          }}
          onScroll={infiniteScroll}
        >
          {curMovieList.length !== 0 ? (
            curMovieList.map((movie) => {
              const { budget, id, title } = movie;
              return (
                <Col key={movie.id} xs={24} md={8} sm={12} lg={6} xl={6}>
                  <MovieCard
                    budget={budget}
                    id={id}
                    title={title}
                    allData={movie}
                    movieLists={movieLists}
                    cover={
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    textAlign="start"
                    deleteMovie={deleteMovie}
                    cardLoading={DeleteMovieLoading || FavoriteMovieLoading}
                    addFavorite={addFavorite}
                  />
                </Col>
              );
            })
          ) : (
            <h2 style={{ textAlign: "center", width: "100%" }}>NoData Found</h2>
          )}
        </Row>
      </div>
      <div>
        {(movieListsLoading || DeleteMovieLoading || FavoriteMovieLoading) && (
          <Spin className={styles.spiner} size="large" />
        )}
      </div>
    </LayOut>
  );
};

export default MovieList;
