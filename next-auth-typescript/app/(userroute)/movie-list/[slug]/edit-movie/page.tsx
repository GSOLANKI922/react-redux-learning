import MovieForm from "@/app/(userroute)/_components/MovieForm";
import React from "react";

const EditMovie = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <MovieForm slug={params.slug} />
    </div>
  );
};

export default EditMovie;
