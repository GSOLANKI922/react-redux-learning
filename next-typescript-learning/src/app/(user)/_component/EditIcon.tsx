"use client";
import { EditTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

function EditIcon({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <div>
      <EditTwoTone
        className="[&_svg]:w-6 [&_svg]:h-6 p-2 hover:bg-[#bfcee3] rounded-md"
        onClick={() => router.push(slug)}
      />
    </div>
  );
}

export default EditIcon;
