"use client";

import { useEffect, useState } from "react";
import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import { useGetMe, useUpdateProfile } from "@/src/hooks/profile";
import { logOut } from "@/src/services/AuthService";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ProfileUpdate = () => {
  const { setIsLoading: setUserLoading, user } = useUser();

  const { data } = useGetMe(user?.email as string);
  const { mutate: handleUpdateProfile } = useUpdateProfile();
  const [imageFiles, setImageFiles] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Ensure client-side rendering
  const router = useRouter();

  // Ensure the component is mounted in the browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Make sure this runs only when the component is mounted
    if (isMounted) {
      if (imageFiles) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(imageFiles as File);
      }
    }
  }, [imageFiles, isMounted]);

  const handleSubmit: SubmitHandler<FieldValues> = async (profileData) => {
    try {
      setLoading(true);
      let payload = { ...profileData };

      if (imageFiles) {
        const formData = new FormData();
        formData.append("file", imageFiles);
        formData.append("upload_preset", "sabbirCloud");
        formData.append("cloud_name", "daar91zv4");

        const { data }: any = await axios.post(
          "https://api.cloudinary.com/v1_1/daar91zv4/upload",
          formData
        );
        payload.profilePhoto = data.secure_url;
      }

      handleUpdateProfile(payload);
      setLoading(false);
      logOut();
      setUserLoading(true);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.data?.errorMessages?.[0]?.message);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles(file);
  };

  if (!data?.data) {
    return null;
  }

  return (
    <div>
      <GTForm
        defaultValues={{
          name: data?.data?.name,
          mobileNumber: data?.data?.mobileNumber,
          email: data?.data?.email,
        }}
        onSubmit={handleSubmit}
      >
        <div className="md:flex">
          <div className="py-4 pl-5 flex-1 container-box">
            <div className="w-full py-2.5">
              <h1 className="font-bold text-xl mb-2">Account Information </h1>

              <div className="mb-2">
                <GTInput label="Name" type="text" name="name" />
              </div>

              <div className="mb-2">
                <GTInput
                  label="Mobile Number"
                  type="text"
                  name="mobileNumber"
                />
              </div>

              <div className="mb-2">
                <GTInput
                  readonly={true}
                  disabled={true}
                  label="Email"
                  type="email"
                  name="email"
                />
              </div>

              {isMounted && (
                <div className="mb-2">
                  <div className="min-w-fit">
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                      htmlFor="image"
                    >
                      Upload image
                    </label>
                    <input
                      multiple
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end w-full mt-5">
                <Button isLoading={loading} type="submit">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="py-4 pl-5 flex-1">
            <div className="w-full py-2.5">
              {isMounted && imagePreview ? (
                <div className="relative rounded-xl h-[300px] border-2 border-dashed border-default-300 p-2">
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                    src={imagePreview}
                  />
                </div>
              ) : (
                <div className="relative rounded-xl h-[300px] border-2 border-dashed border-default-300 p-2">
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                    src={data?.data?.profilePhoto}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </GTForm>
    </div>
  );
};

export default ProfileUpdate;
