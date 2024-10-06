/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button, Checkbox } from "@nextui-org/react";
import { useCreatePost } from "@/src/hooks/post";
import { useUser } from "@/src/context/user.provider";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Editor from "../ui/Editor/Editor";
import { uploadToCloudinary } from "@/src/utils/uploadToCloudinary";
import { useGetMe } from "@/src/hooks/profile";

const CreatePost = () => {
  const pathname = usePathname();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const { user, query } = useUser();
  const [content, setContent] = useState("");
  const { data: me } = useGetMe(user?.email as string);
  const { mutate: createPost } = useCreatePost();
  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setImage(e.target.files[0]);
      setImagePreview(image);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const postData: any = {
      user: user?._id,
      ...data,
      content,
    };
    if (image) {
      const imageUrl = await uploadToCloudinary(image as File, "image");
      postData.imageUrl = imageUrl;
    }

    createPost(postData, {
      onSuccess() {
        reset();
        setContent("");
        setLoading(false);
        setImagePreview("");
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
        setShowModal(false);
      },
      onError() {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Button
        variant={pathname.startsWith("/profile") ? "light" : "bordered"}
        onPress={() => setShowModal(true)}
      >
        Create Post <PlusIcon size={18} />
      </Button>
      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={showModal}
        onOpenChange={() => setShowModal(false)}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex  items-center gap-10">
                    <h1>Create a Post</h1>
                    {uploadingImage && (
                      <p className="flex items-center gap-2 text-sm">
                        <span> Uploading Image</span> <Spinner size="sm" />
                      </p>
                    )}
                  </div>
                </ModalHeader>

                <ModalBody>
                  <Editor
                    setUploadingImage={setUploadingImage}
                    content={content}
                    setContent={setContent}
                  />
                  <div className="mt-5 space-y-3">
                    <Input
                      {...register("title", { required: true })}
                      label="Title"
                      name="title"
                      type="text"
                    />
                    <Input
                      {...register("category", { required: true })}
                      label="Category"
                      name="category"
                      type="text"
                    />
                    <Input
                      onChange={handleImageChange}
                      name="imageUrl"
                      type="file"
                    />
                    {imagePreview && (
                      <div className="relative rounded-xl h-[300px] border-2 border-dashed border-default-300 p-2">
                        <img
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imagePreview}
                        />
                      </div>
                    )}
                    <Input
                      {...register("description")}
                      label="Description"
                      name="description"
                      type="textarea"
                    />

                    {me?.data?.isVerified && me?.data?.premiumStatus && (
                      <div className="flex items-center justify-between">
                        <Checkbox {...register("isPremium")} color="success">
                          Premium
                        </Checkbox>
                      </div>
                    )}
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button isLoading={loading} type="submit" color="primary">
                    Create Post
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
