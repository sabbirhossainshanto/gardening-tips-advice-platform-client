"use client";

import { useUser } from "@/src/context/user.provider";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useAddNewsFeed, useGetAllNewsFeed } from "@/src/hooks/newsFeed";
import { useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

const NewsFeed = () => {
  const { data } = useGetAllNewsFeed();
  const { mutate: addNewsFeed } = useAddNewsFeed();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImage = () => {
    fileInputRef.current!.click();
  };

  const handleAddNewsFeed = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      addNewsFeed(formData, {
        onSuccess(data) {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        },
      });
    }
  };

  return (
    <div>
      <Swiper
        slidesPerView="auto"
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide
          style={{ height: "200px", width: "150px", marginRight: "5px" }}
        >
          {" "}
          <button
            onClick={handleOpenImage}
            className="!h-[200px] !w-[150px] bg-gray-500 rounded-md overflow-hidden relative cursor-pointer"
          >
            {user?.profilePhoto && (
              <img
                className="h-full w-full object-cover rounded-md "
                alt="profile"
                src={user?.profilePhoto}
              />
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0 rounded-md" />
            <div className="absolute bottom-0 w-full h-full flex flex-col gap-4 items-center justify-end  z-10 ">
              <div className="bg-white p-4 rounded-full">
                <Plus className="text-primary" />
              </div>
              <h6 className="text-white">Add Story</h6>
            </div>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleAddNewsFeed}
            />
          </button>
        </SwiperSlide>
        {data?.data?.map((newsFeed) => {
          return (
            <SwiperSlide
              style={{ height: "200px", width: "150px", marginRight: "5px" }}
              key={newsFeed?._id}
            >
              <button className="!h-[200px] !w-[150px] bg-gray-500 rounded-md overflow-hidden relative cursor-pointer">
                <img
                  className="h-full w-full object-cover rounded-md "
                  alt="profile"
                  src={newsFeed?.photo}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0 rounded-md" />
                <div className="absolute bottom-0 w-full h-full flex flex-col gap-4 items-center justify-end  z-10 ">
                  <div className="bg-white h-16 w-16 rounded-full">
                    {user?.profilePhoto && (
                      <Image
                        width={100}
                        height={100}
                        className="h-full w-full rounded-full object-cover"
                        alt="profilePhoto"
                        src={user?.profilePhoto}
                      />
                    )}
                  </div>
                  <h6 className="text-white">
                    {newsFeed?.user?.name?.substring(0, 15)}
                  </h6>
                </div>
              </button>
            </SwiperSlide>
          );
        })}{" "}
      </Swiper>
    </div>
  );
};

export default NewsFeed;
