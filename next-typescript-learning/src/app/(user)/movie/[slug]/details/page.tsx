// import { GET_MOVIE } from "@/app/(user)/graphql/queries";
// import { createClient } from "@/lib/apollo/client";
// import { serverAuthClient } from "@/lib/apollo/server";
// import React from "react";

// const MovieDetails = async ({ params }: { params: { slug: string } }) => {
//   const { data } = await serverAuthClient?.query({
//     query: GET_MOVIE,
//     variables: {
//       movieId: params.slug,
//     },
//     fetchPolicy: "network-only",
//   });
//   if (data) {
//     console.log(data, "res");
//   }
//   return <div>MovieDetails</div>;
// };

import EditIcon from "@/app/(user)/_component/EditIcon";
import { GET_MOVIE } from "@/app/(user)/graphql/queries";
import { ROUTES } from "@/constants";
import { serverAuthClient } from "@/lib/apollo/server";
import Image from "next/image";
import React from "react";

const MovieDetails = async ({ params }: { params: { slug: string } }) => {
  const { data } = await serverAuthClient?.query({
    query: GET_MOVIE,
    variables: {
      movieId: params.slug,
    },
    fetchPolicy: "network-only",
  });

  return (
    <div className="h-full">
      <div className="relative">
        <Image
          src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"
          alt="profile bg image"
          height={400}
          width={500}
          className="w-full h-72 rounded-xl hero-image"
        />

        <div className="profile-image-container">
          <Image
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profile image"
            height={200}
            width={200}
            className="profile-image"
          />
        </div>
      </div>
      <div className="contain-container relative">
        <div className="absolute edit-contain">
          <EditIcon slug={`${ROUTES.MOVIE}/${params.slug || ""}/edit`} />
        </div>
        <h3 className="text-center">
          <span className="font-bold">Title: {data?.movie?.data?.title} </span>
        </h3>
        <p className="py-4">
          Adult : {data?.movie?.data?.adult ? "YES" : "NO"}
        </p>
        {data?.movie?.data?.originalLanguage && (
          <p className="py-4">
            Language : {data?.movie?.data?.originalLanguage}
          </p>
        )}
        {data?.movie?.data?.budget && (
          <p className="py-4">Budget : {data?.movie?.data?.budget}</p>
        )}
        {data?.movie?.data?.releaseDate && (
          <p className="py-4">ReleaseDate : {data?.movie?.data?.releaseDate}</p>
        )}
        {data?.movie?.data?.runtime && (
          <p className="py-4">Run Time : {data?.movie?.data?.runtime}</p>
        )}
        {data?.movie?.data?.overview && (
          <p className="py-4">OverView : {data?.movie?.data?.overview}</p>
        )}

        {/* {data?.person?.data?.popularity && (
          <p className="py-4">
            Popularity :{" "}
            <Rate
              allowHalf
              defaultValue={data?.person?.data?.popularity * 100 || 0}
            />
          </p>
        )} */}
      </div>
    </div>
  );
};

export default MovieDetails;
