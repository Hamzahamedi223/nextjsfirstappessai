"use client";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const create = () => {
  const [username, setUserName] = useState(''); 
  const { user } = useUser();
  const router = useRouter(); 
  useEffect(() => {
   user&&CheckUser();
  }, [user])
  
  console.log(router);
  const CheckUser = async () => {
    console.log("CheckUser function called");
    const result = await db
      .select()
      .from(userinfo)
      .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if (result?.length > 0) {
      router.replace("/admin");
    }
  };
  const OnCreateBtnClick = async () => { 
    if (username.length > 10) {
      toast.error("Error Notification!", {
        position: "top-left",
      });
      return;
    }

    const result = await db.insert(userinfo)
    .values({
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      username: username.replace('  ',' '), 
    });

    if (result) {
      toast.success("User created", { 
        position: "top-left",
      });

      router.replace('/admin');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 border rounded-lg flex flex-col">
        <h2 className="text-gray-50 font-bold text-2xl py-5 text-center">
          Create portfolio username
        </h2>
        <label className="py-2 text-gray-50">
          Add username for your portfolio
        </label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => setUserName(event.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={OnCreateBtnClick}
          disabled={!username}
          className="btn btn-primary mt-3"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default create;
