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
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import { Input } from "@nextui-org/input";
import { Button, Checkbox } from "@nextui-org/react";
import {
  useCreatePost,
  useGetSInglePost,
  useUpdatePost,
} from "@/src/hooks/post";
import { useUser } from "@/src/context/user.provider";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useShowUpdatePostModal } from "@/src/store/updatePostModal";
import { IPost } from "@/src/types";

const UpdatePost = ({ post }: { post: IPost }) => {
  const [imagePreview, setImagePreview] = useState("");
  const { mutate: updatePost } = useUpdatePost();
  const { data: singlePost } = useGetSInglePost(post?._id);
  const pathname = usePathname();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useShowUpdatePostModal();
  const [image, setImage] = useState<File>();
  const { user, query } = useUser();
  const [content, setContent] = useState("<p>dfddfdfdfdf</p>");
  const { mutate: createPost } = useCreatePost();
  const { register, handleSubmit, reset } = useForm();
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (content: string) => {
    setContent(content);
  };

  const uploadToCloudinary = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      // https://api.cloudinary.com/v1_1/daar91zv4/upload
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudinary(file, "image");
        setUploadingImage(false);
        if (imageUrl) {
          const quill = quillRef.current!.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl, "user");
        }
      }
    };
  }, []);

  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const videoUrl = await uploadToCloudinary(file, "video");
        if (videoUrl) {
          const quill = quillRef.current!.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "video", videoUrl, "user");
        }
      }
    };
  };

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
    let postData: any = {
      id: singlePost?.data?._id,
      data: {
        ...data,
        content,
      },
    };
    if (image) {
      const imageUrl = await uploadToCloudinary(image as File, "image");
      postData.data.imageUrl = imageUrl;
    }

    console.log(data);
    updatePost(postData, {
      onSuccess() {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: [`GET_ALL_POST`, query] });
        setShowModal(false);
      },
      onError() {
        setLoading(false);
      },
    });
  };

  /* Quill config */
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  const toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "code-block"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: {
      container: toolbar,
      handlers: {
        image: handleImageUpload,
        // video: handleVideoUpload,
      },
    },
  };

  useEffect(() => {
    if (singlePost?.data) {
      reset({
        title: singlePost?.data?.title,
        category: singlePost?.data?.category,
        description: singlePost?.data?.description,
        isPremium: singlePost?.data?.isPremium,
      });
      setContent(singlePost?.data?.content);
    }
  }, [singlePost]);

  if (!singlePost?.data) {
    return null;
  }
  console.log(content);
  return (
    <>
      <Modal
        size="5xl"
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
                    <h1>Update This Post</h1>
                    {uploadingImage && (
                      <p className="flex items-center gap-2 text-sm">
                        <span> Uploading Image</span> <Spinner size="sm" />
                      </p>
                    )}
                  </div>
                </ModalHeader>

                <ModalBody>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    ref={quillRef}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
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

                    {!imagePreview && singlePost?.data?.imageUrl && (
                      <div className="relative rounded-xl h-[300px] border-2 border-dashed border-default-300 p-2">
                        <img
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={singlePost?.data?.imageUrl}
                        />
                      </div>
                    )}
                    <Input
                      {...register("description")}
                      label="Description"
                      name="description"
                      type="textarea"
                    />

                    <div className="flex items-center justify-between">
                      <Checkbox {...register("isPremium")} color="success">
                        Premium
                      </Checkbox>
                    </div>
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
                    Update Post
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

export default UpdatePost;
