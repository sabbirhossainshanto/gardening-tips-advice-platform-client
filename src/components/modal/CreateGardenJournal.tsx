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
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useCreateGardenJournal } from "@/src/hooks/garden-journal";
import { uploadToCloudinary } from "@/src/utils/uploadToCloudinary";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/context/user.provider";

const CreateGardenJournal = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: createGardenJournal } = useCreateGardenJournal();
  const [showModal, setShowModal] = useState(false);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    isPublic: false,
    image: null as File | null,
    preview: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEntry((prev) => ({
        ...prev,
        preview: URL.createObjectURL(e.target.files![0]),
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const image = await uploadToCloudinary(entry.image as File, "image");
    const gardenJournalData = {
      title: entry.title,
      image,
      content: entry.content,
      user: user?._id,
      isPublic: entry?.isPublic,
    };

    createGardenJournal(gardenJournalData, {
      onSuccess() {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["get_my_journals"] });
        setShowModal(false);
      },
      onError() {
        setShowModal(false);
      },
    });
  };
  return (
    <>
      <Button variant={"bordered"} onPress={() => setShowModal(true)}>
        Create Garden Journal <PlusIcon size={18} />
      </Button>
      <Modal
        size="4xl"
        isOpen={showModal}
        onOpenChange={() => setShowModal(false)}
        placement="top-center"
        scrollBehavior="inside"
      >
        <form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 mx-14">
                  Create Garden Journal
                </ModalHeader>

                <ModalBody>
                  <div className="container-box">
                    <Card className="p-5">
                      <Input
                        required
                        label="Title"
                        name="title"
                        placeholder="Enter your journal title"
                        fullWidth
                        onChange={handleInputChange}
                      />
                      <Spacer y={1} />
                      <Textarea
                        required
                        label="Entry"
                        name="content"
                        placeholder="Write about your gardening activities..."
                        fullWidth
                        onChange={handleInputChange}
                      />
                      <Spacer y={4} />
                      <Input
                        required
                        type="file"
                        label="Attach Image"
                        onChange={handleImageChange}
                        accept="image/*"
                        fullWidth
                      />
                      <Spacer y={1} />
                      {entry.preview && (
                        <Image src={entry.preview} alt="Journal Entry Image" />
                      )}
                      <Checkbox
                        name="isPublic"
                        onChange={(e) =>
                          setEntry({ ...entry, isPublic: e.target.checked })
                        }
                        color="success"
                      >
                        Public
                      </Checkbox>
                    </Card>
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
                    Save Entry
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

export default CreateGardenJournal;
