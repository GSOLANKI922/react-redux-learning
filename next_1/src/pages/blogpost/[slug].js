import { useRouter } from "next/router";
import React from "react";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h1>post : {slug}</h1>
    </div>
  );
};

export default Slug;
