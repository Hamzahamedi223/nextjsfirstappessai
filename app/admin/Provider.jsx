"use client"
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";

const Provider = ({ children }) => {
  const [userDetail,SetuserDetail]=useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && GetUserDetails();
  }, [user]);

  const GetUserDetails = async () => {
    const result = await db
      .select()
      .from(userinfo)
      .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));
      SetuserDetail(result[0]);
  };
  return (
  <UserDetailContext.Provider value={{userDetail,SetuserDetail}}>
  <div>{children}</div>;
  </UserDetailContext.Provider>
)};

export default Provider;
