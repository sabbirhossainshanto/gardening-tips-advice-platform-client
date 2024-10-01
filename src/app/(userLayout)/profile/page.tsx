import PostCard from "@/src/components/shared/PostCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost } from "@/src/types";
import { NexiosResponse } from "nexios-http/types/interfaces";

const Profile = async () => {
  interface IPostResponseType {
    success: boolean;
    message: string;
    data: IPost[];
  }
  const { data }: NexiosResponse<IPostResponseType> = await nexiosInstance.get(
    `/posts/get-my-post`,
    {
      next: {
        tags: ["post"],
      },
    }
  );

  return (
    <div>
      <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
        {data?.data?.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
