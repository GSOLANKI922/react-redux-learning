"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditIcon from "./EditIcon";

const { Meta } = Card;

const MovieCard = ({
  originalTitle,
  id,
  budget,
  loading,
  deleteHandler,
}: {
  originalTitle?: string;
  id?: string;
  budget?: number;
  loading?: boolean;
  deleteHandler(deletePersonId?: string): Promise<void>;
}) => {
  const router = useRouter();
  return (
    <>
      <Card
        hoverable
        className="movie-card m-4"
        loading={loading}
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
        <Meta title={originalTitle} description={budget} />
        <Meta
          avatar={
            <div className="border-t-2 mt-4 w-full flex justify-between -top-1 ">
              <EditIcon slug={`/movie-list/${id || ""}/edit-movie`} />
              <DeleteTwoTone
                twoToneColor="#c23c32"
                className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#c29f9f] rounded-md"
                onClick={() => deleteHandler(id)}
              />
              <Link href={`/movie-list/${id}/details`}>
                <EyeTwoTone className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#bfcee3] rounded-md" />
              </Link>
            </div>
          }
        />
      </Card>
    </>
  );
};

export default MovieCard;
