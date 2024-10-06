"use client";
import { useUser } from "@/src/context/user.provider";
import React from "react";
import CreatePost from "../modal/CreatePost";
import SortByUpVotes from "./SortByUpVotes/SortByUpVotes";

const UserActionButtons = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between w-full container-box">
      {user?.email && <CreatePost />}
      <SortByUpVotes />
    </div>
  );
};

export default UserActionButtons;
