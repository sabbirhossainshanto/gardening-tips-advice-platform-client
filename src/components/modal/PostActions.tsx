/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useCreateRelationship,
  useGetMySingleFollowing,
  useUnFollowUser,
} from "@/src/hooks/userRelationship";
import { IPost } from "@/src/types";
import handleCopyPostURL from "@/src/utils/handleCopyPostURL";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MoreVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Options } from "react-to-pdf";
import { toast } from "sonner";

interface IProps {
  post: IPost;
  toPDF: (options?: Options) => void;
}

export default function PostActions({ post, toPDF }: IProps) {
  const router = useRouter();
  const { mutate: followUser } = useCreateRelationship();
  const { mutate: unFollowUser } = useUnFollowUser();
  const { data: followingUser, refetch } = useGetMySingleFollowing(
    post?.user?._id
  );

  const handleFollowUser = (id: string) => {
    const payload = {
      targetUser: id,
      relationshipType: "follow",
      isFollowing: true,
    };
    followUser(payload, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        } else {
          toast?.error(data?.message);
        }
      },
    });
  };
  const handleUnFollowUser = (id: string) => {
    unFollowUser(id, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        } else {
          toast?.error(data?.message);
        }
      },
    });
  };

  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <MoreVerticalIcon cursor="pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleCopyPostURL(post?._id)} key="copy">
          Copy Link
        </DropdownItem>
        <DropdownItem onClick={() => toPDF()} key="pdf">
          Generate PDF
        </DropdownItem>
        <DropdownItem
          key="post"
          onClick={() => router.push(`/all-posts/${post?.user?._id}`)}
        >
          See Posts
        </DropdownItem>
        {followingUser && followingUser?.data?.isFollowing ? (
          <DropdownItem
            key="unfollow"
            onClick={() => handleUnFollowUser(post?.user?._id)}
          >
            Unfollow
          </DropdownItem>
        ) : (
          <DropdownItem
            key="follow"
            onClick={() => handleFollowUser(post?.user?._id)}
          >
            Follow
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
