"use client";

import {
  useGetMyFriend,
  useUpdatePendingFriend,
} from "@/src/hooks/userRelationship";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { toast } from "sonner";

const Friends = () => {
  const { mutate: updatePendingFriend } = useUpdatePendingFriend();
  const { data, refetch } = useGetMyFriend();

  const handleUpdatePendingFriend = (payload: {
    type: "accept" | "reject";
    userId: string;
  }) => {
    updatePendingFriend(payload, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };
  console.log(data);

  return (
    <>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data?.map((pFriend) => {
          return (
            <div
              key={pFriend?._id}
              className="w-full bg-white  rounded-md shadow-md"
            >
              <Image
                className="rounded-sm"
                src={pFriend?.user?.profilePhoto}
                height={100}
                width={500}
                alt="profile"
              />
              <div className="p-4 flex flex-col gap-2">
                <h1 className="text-lg lg:text-xl font-medium">
                  {pFriend?.user?.name}
                </h1>
                <Button
                  onPress={() =>
                    handleUpdatePendingFriend({
                      type: "reject",
                      userId: pFriend?.user?._id,
                    })
                  }
                  className="bg-primary rounded-md h-[40px] text-white font-medium text-lg "
                >
                  Confirm
                </Button>
                <Button
                  onPress={() =>
                    handleUpdatePendingFriend({
                      type: "reject",
                      userId: pFriend?.user?._id,
                    })
                  }
                  className="rounded-md h-[40px]  font-medium text-lg "
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {data?.data?.length === 0 && (
        <p className="w-full flex justify-center">
          You dont have any pending friend request
        </p>
      )}
    </>
  );
};

export default Friends;
