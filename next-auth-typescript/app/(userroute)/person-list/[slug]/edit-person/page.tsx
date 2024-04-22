import PersonForm from "@/app/(userroute)/_components/PersonForm";
import React from "react";

const EditPerson = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <PersonForm type="edit" slug={params.slug} />
    </div>
  );
};

export default EditPerson;
