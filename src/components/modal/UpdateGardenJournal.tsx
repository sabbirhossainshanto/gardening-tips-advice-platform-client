/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import {
  Button,
  Checkbox,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import React, { Dispatch, useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import {
  useGetSingleGardenJournal,
  useUpdateSingleGardenJournal,
} from "@/src/hooks/garden-journal";
import { uploadToCloudinary } from "@/src/utils/uploadToCloudinary";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/context/user.provider";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SetStateAction } from "jotai";

interface IProps {
  id: string;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}

const UpdateGardenJournal = ({
  id,
  setShowUpdateModal,
  showUpdateModal,
}: IProps) => {
  const { data } = useGetSingleGardenJournal(id);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: updateGardenJournal } = useUpdateSingleGardenJournal();
  const [entry, setEntry] = useState({
    image: null as File | null,
    preview: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEntry((prev) => ({
        ...prev,
        preview: URL.createObjectURL(e.target.files![0]),
        image: e.target.files![0],
      }));
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const gardenJournalData: Record<string, unknown> = {
      id,
      data: {
        ...data,
        user: user?._id as string,
      },
    };
    if (entry.image) {
      const image = await uploadToCloudinary(entry.image as File, "image");
      gardenJournalData.image = image;
    }

    updateGardenJournal(gardenJournalData, {
      onSuccess(data) {
        console.log(data);
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["get_my_journals"] });
        setShowUpdateModal(false);
      },
      onError() {
        setShowUpdateModal(false);
      },
    });
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        isPublic: data?.data?.isPublic,
        content: data?.data?.content,
        title: data?.data?.title,
      });
    }
  }, [data]);

  return (
    <>
      <Button onPress={() => setShowUpdateModal(true)}>
        <EditIcon size={18} className="text-success" />
      </Button>

      <Modal
        size="4xl"
        isOpen={showUpdateModal}
        onOpenChange={() => setShowUpdateModal(false)}
        placement="top-center"
        scrollBehavior="inside"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create Garden Journal
                </ModalHeader>

                <ModalBody>
                  <div className="container-box">
                    <Card className="p-5">
                      <Input
                        {...register("title")}
                        label="Title"
                        placeholder="Enter your journal title"
                        fullWidth
                      />
                      <Spacer y={1} />
                      <Textarea
                        label="Entry"
                        {...register("content")}
                        placeholder="Write about your gardening activities..."
                        fullWidth
                      />
                      <Spacer y={4} />
                      <Input
                        type="file"
                        label="Attach Image"
                        onChange={handleImageChange}
                        accept="image/*"
                        fullWidth
                      />
                      <Spacer y={1} />
                      {entry.preview ? (
                        <Image src={entry.preview} alt="Journal Entry Image" />
                      ) : (
                        <Image
                          src={data?.data?.image}
                          alt="Journal Entry Image"
                        />
                      )}
                      <Spacer y={5} />
                      <Checkbox {...register("isPublic")} color="success">
                        Public
                      </Checkbox>
                    </Card>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setShowUpdateModal(false)}
                  >
                    Close
                  </Button>
                  <Button isLoading={loading} type="submit" color="primary">
                    Edit Entry
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

export default UpdateGardenJournal;
