"use client";

import { IUser } from "@/src/types";
import { Button, Image, Tabs as NextTabs, Tab } from "@nextui-org/react";
import { useFollowUnfollow } from "@/src/hooks/follow";

interface ITabsProps {
  users: IUser[];
  myProfile: IUser;
}

const Tabs = ({ users, myProfile }: ITabsProps) => {
  const { mutate } = useFollowUnfollow();
  const handleFollowUnFollow = (id: string) => {
    mutate({ followingId: id });
  };
  return (
    <div className="flex w-full flex-col">
      <NextTabs aria-label="Options">
        <Tab key="Users" title="Users">
          {users?.map((user) => {
            const isAlreadyFollowed = user?.followers?.find(
              (follower) => follower?._id === myProfile?._id
            );
            return (
              <div
                key={user._id}
                className="flex items-center justify-between mt-2"
              >
                <Image
                  className="size-12 rounded-full"
                  src={user.profilePhoto}
                />
                <div>
                  <h1>{user?.name}</h1>
                </div>
                <Button
                  onClick={() => handleFollowUnFollow(user?._id)}
                  className="rounded-full"
                >
                  {isAlreadyFollowed ? "  Following" : "  Follow"}
                </Button>
              </div>
            );
          })}
        </Tab>
        <Tab key="Follower" title="Follower">
          {myProfile?.followers?.map((user: IUser) => {
            return (
              <div
                key={user._id}
                className="flex items-center justify-between mt-2"
              >
                <Image
                  className="size-12 rounded-full"
                  src={user.profilePhoto}
                />
                <div>
                  <h1>{user?.name}</h1>
                </div>
                <Button
                  onClick={() => handleFollowUnFollow(user?._id)}
                  className="rounded-full"
                >
                  Follower
                </Button>
              </div>
            );
          })}
        </Tab>
        <Tab key="Following" title="Following">
          {myProfile?.following?.map((user: IUser) => {
            return (
              <div
                key={user._id}
                className="flex items-center justify-between mt-2"
              >
                <Image
                  className="size-12 rounded-full"
                  src={user.profilePhoto}
                />
                <div>
                  <h1>{user?.name}</h1>
                </div>
                <Button
                  onClick={() => handleFollowUnFollow(user?._id)}
                  className="rounded-full"
                >
                  Unfollow
                </Button>
              </div>
            );
          })}
        </Tab>
      </NextTabs>
    </div>
  );
};

export default Tabs;
