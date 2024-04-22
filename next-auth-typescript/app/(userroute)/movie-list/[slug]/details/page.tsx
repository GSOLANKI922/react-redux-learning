import EditIcon from "@/app/(userroute)/_components/EditIcon";
import { MOVIE, PERSON } from "@/app/(userroute)/graphql/query";
import getClient from "@/provider/apolloClient";
import { Rate } from "antd";
import Image from "next/image";
import React from "react";

const MovieDetails = async ({ params }: { params: { slug: string } }) => {
  const res = await getClient().query({
    query: MOVIE,
    variables: {
      movieId: params.slug,
    },
    fetchPolicy: "network-only",
  });
  let movieData;
  if (res.data.movie) {
    movieData = res.data.movie.data;
  }

  return (
    <div className="h-full">
      <div className="relative">
        <Image
          src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"
          alt="profile bg image"
          height={500}
          width={500}
          className="w-full h-72 rounded-xl"
        />
        <div className="absolute top-0 right-0 m-2">
          <EditIcon slug={`/movie-list/${params.slug || ""}/edit-movie`} />
        </div>
        <div className="w-28 h-28 absolute -bottom-14 right-[46%] overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/713959/pexels-photo-713959.jpeg"
            alt="profile image"
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="border-2 rounded-2xl mt-8 text-lg px-8 md:px-24 font-serif pb-11 bg-[#e5e7eb]">
        <h3 className="mt-8 text-center">
          <span className="font-bold">Name: </span>
          {movieData?.title}
        </h3>
        <p className="py-4">Adult : {movieData?.adult ? "YES" : "NO"}</p>
        {movieData?.originalTitle && (
          <p className="py-4">Original Title : {movieData?.originalTitle}</p>
        )}
        {movieData?.overview && (
          <p className="py-4">Overview : {movieData?.overview}</p>
        )}
        {movieData?.revenue && (
          <p className="py-4">revenue : {movieData?.revenue}</p>
        )}
        {movieData?.originalLanguage && (
          <p className="py-4">Language : {movieData?.originalLanguage}</p>
        )}
        {movieData?.releaseDate && (
          <p className="py-4">Release Date : {movieData?.releaseDate}</p>
        )}

        {movieData?.popularity && (
          <p className="py-4">
            Popularity :{" "}
            <Rate allowHalf defaultValue={movieData?.popularity * 100 || 0} />
          </p>
        )}
        {movieData?.status && (
          <p className="py-4">Status : {movieData?.status}</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
