import SinglePost from "@/src/components/ui/SinglePost/SinglePost";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IPost, IResponse } from "@/src/types";
import { NexiosResponse } from "nexios-http/types/interfaces";

const SinglePostPage = async ({ params }: { params: { postId: string } }) => {
  const { data }: NexiosResponse<IResponse<IPost>> = await nexiosInstance.get(
    `/posts/${params.postId}`
  );

  return <div>{data?.data && <SinglePost post={data?.data} />}</div>;
};

export default SinglePostPage;
