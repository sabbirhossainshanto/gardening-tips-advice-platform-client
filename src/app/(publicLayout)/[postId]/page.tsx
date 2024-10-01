import SinglePost from "@/src/components/ui/SinglePost/SinglePost";
import nexiosInstance from "@/src/lib/NexiosInstance";

const page = async ({ params }: { params: { postId: string } }) => {
  const { data }: any = await nexiosInstance.get(`/posts/${params.postId}`);

  return (
    <div>
      <SinglePost post={data?.data} />
    </div>
  );
};

export default page;
