import nexiosInstance from "@/src/lib/NexiosInstance";
import { Card as NextUiCard } from "@nextui-org/card";
import Tabs from "./Tabs";

const AllUsers = async () => {
  const { data }: any = await nexiosInstance.get("/users", {
    next: {
      tags: ["user"],
    },
  });
  const { data: myProfile }: any = await nexiosInstance.get("/profile");

  return (
    <NextUiCard
      isFooterBlurred
      className="h-[400px] w-full p-3 border border-gray-700 overflow-y-scroll"
    >
      <Tabs users={data?.data} myProfile={myProfile?.data} />
    </NextUiCard>
  );
};

export default AllUsers;
