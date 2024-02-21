"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return <div onClick={() => router.push("/")}>HOME</div>;
};

export default Header;
