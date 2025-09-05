import UserForm from "@/app/(user)/_component/UserForm";
import { useRouter } from "next/navigation";
import React from "react";

const EditUser = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <UserForm slug={params?.slug} />
    </div>
  );
};

export default EditUser;
