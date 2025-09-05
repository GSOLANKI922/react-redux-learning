import MovieForm from "@/app/(user)/_component/MovieForm";
import React from "react";

const EditMovie = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <MovieForm slug={params?.slug} />
    </div>
  );
};

export default EditMovie;
