import EditIcon from "@/app/(user)/_component/EditIcon";
import { GET_PERSON } from "@/app/(user)/graphql/queries";
import { ROUTES } from "@/constants";
import { serverAuthClient } from "@/lib/apollo/server";
import { Rate } from "antd";
import Image from "next/image";
import React from "react";

const MovieDetails = async ({ params }: { params: { slug: string } }) => {
  const { data } = await serverAuthClient.query({
    query: GET_PERSON,
    variables: {
      personId: params.slug,
    },
    fetchPolicy: "network-only",
  });

  return (
    <div className="h-full">
      <div className="relative">
        <Image
          src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"
          alt="profile bg image"
          height={500}
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
          <EditIcon slug={`${ROUTES.USER}/${params.slug || ""}/edit`} />
        </div>
        <h3 className="text-center">
          <span className="font-bold">Name: {data?.person?.data?.name} </span>
        </h3>
        <p className="py-4">
          Adult : {data?.person?.data?.adult ? "YES" : "NO"}
        </p>
        {data?.person?.data?.knownForDepartment && (
          <p className="py-4">
            known For Department : {data?.person?.data?.knownForDepartment}
          </p>
        )}
        {data?.person?.data?.alsoKnownAs && (
          <p className="py-4">
            Also KnownAs : {data?.person?.data?.alsoKnownAs}
          </p>
        )}
        {data?.person?.data?.biography && (
          <p className="py-4">biography : {data?.person?.data?.biography}</p>
        )}
        {data?.person?.data?.tmdbId && (
          <p className="py-4">Tmdb Id : {data?.person?.data?.tmdbId}</p>
        )}
        {data?.person?.data?.deathday && (
          <p className="py-4">Death Date : {data?.person?.data?.deathday}</p>
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
