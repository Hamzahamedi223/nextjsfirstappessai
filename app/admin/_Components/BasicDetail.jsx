import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Camera, Link2, MapPin } from "lucide-react";
import React, { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const BasicDetail = () => {
  const timeoutId = useRef(null);
  const { user } = useUser();
  const { userDetail, SetuserDetail } = useContext(UserDetailContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedOption === "location") {
      setInputValue(userDetail?.location || "");
    } else if (selectedOption === "url") {
      setInputValue(userDetail?.url || "");
    }
  }, [selectedOption, userDetail]);

  const onInputChange = (event, fieldName) => {
    const value = event.target.value;
    setInputValue(value);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      const result = await db
        .update(userinfo)
        .set({
          [fieldName]: value,
        })
        .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));

      if (result) {
        toast.success("Saved!", {
          position: "top-left",
        });
        SetuserDetail((prev) => ({ ...prev, [fieldName]: value }));
      } else {
        toast.error("Error!", {
          position: "top-left",
        });
      }
    }, 1000);
  };

  return (
    <div className="p-7 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-2 items-center">
        <Camera className="rounded-full p-3 h-12 w-12 bg-gray-500" />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => onInputChange(event, "name")}
          className="input input-bordered input-primary w-full max-w-full"
          defaultValue={userDetail?.name}
        />
      </div>
      <textarea
        className="textarea textarea-primary mt-2 w-full"
        placeholder="About you"
        defaultValue={userDetail?.bio}
        onChange={(event) => onInputChange(event, "bio")}
      ></textarea>
      <div className="flex gap-3 mt-6">
        <MapPin
          className={`h-12 w-12 text-red-500 p-3 hover:bg-gray-500 rounded-md 
          ${selectedOption === "location" && "bg-gray"}`}
          onClick={() => setSelectedOption("location")}
        />
        <Link2
          className={`h-12 w-12 text-green-500 p-3 hover:bg-gray-500 rounded-md
          ${selectedOption === "url" && "bg-gray"}
          `}
          onClick={() => setSelectedOption("url")}
        />
      </div>
      {selectedOption === "location" ? (
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <MapPin />
            <input
              type="text"
              value={inputValue}
              className="grow"
              placeholder="location"
              onChange={(event) => onInputChange(event, "location")}
            />
          </label>
        </div>
      ) : selectedOption === "url" ? (
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <Link2 />
            <input
              type="text"
              value={inputValue}
              className="grow"
              placeholder="url"
              onChange={(event) => onInputChange(event, "url")}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default BasicDetail;
