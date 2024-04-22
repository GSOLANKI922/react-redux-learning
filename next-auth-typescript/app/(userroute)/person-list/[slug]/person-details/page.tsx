import EditIcon from "@/app/(userroute)/_components/EditIcon";
import { PERSON } from "@/app/(userroute)/graphql/query";
import getClient from "@/provider/apolloClient";
import { Rate } from "antd";
import Image from "next/image";
import React from "react";

const PersonDetails = async ({ params }: { params: { slug: string } }) => {
  const res = await getClient().query({
    query: PERSON,
    variables: {
      personId: params.slug,
    },
    fetchPolicy: "network-only",
  });
  let personData;
  if (res.data.person) {
    personData = res.data.person.data;
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
          <EditIcon
            slug={`/person-list/${params.slug || ""}/edit-person`}
          />
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
          {personData?.name}
        </h3>
        <p className="py-4">Adult : {personData?.adult ? "YES" : "NO"}</p>
        {personData?.alsoKnownAs && (
          <p className="py-4">Known As : {personData?.alsoKnownAs}</p>
        )}
        {personData?.biography && (
          <p className="py-4">Biography : {personData?.biography}</p>
        )}
        {personData?.gender && (
          <p className="py-4">Gender : {personData?.gender}</p>
        )}
        {personData?.birthday && (
          <p className="py-4">Birth Date : {personData?.birthday}</p>
        )}
        {personData?.knownForDepartment && (
          <p className="py-4">
            known For Department : {personData?.knownForDepartment}
          </p>
        )}

        {personData?.popularity && (
          <p className="py-4">
            Popularity :{" "}
            <Rate allowHalf defaultValue={personData?.popularity * 100 || 0} />
          </p>
        )}
        {personData?.placeOfBirth && (
          <p className="py-4">Birth Place : {personData?.placeOfBirth}</p>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
