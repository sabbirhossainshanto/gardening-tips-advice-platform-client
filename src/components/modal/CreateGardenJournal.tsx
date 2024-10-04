/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import React, { useState } from "react";
import GTForm from "../form/GTForm";
import { PlusIcon } from "lucide-react";

const CreateGardenJournal = () => {
  const [showModal, setShowModal] = useState(false);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    image: "",
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
        image: URL.createObjectURL(e.target.files![0]),
      }));
    }
  };

  const handleSubmit = () => {
    // Handle the form submission logic here (save the journal entry)
    console.log(entry);
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
        <GTForm
          //! Only for development
          defaultValues={{
            email: "sabbir@gmail.com",
            password: "123456",
          }}
          onSubmit={handleSubmit}
        >
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
                        label="Title"
                        name="title"
                        placeholder="Enter your journal title"
                        fullWidth
                        onChange={handleInputChange}
                      />
                      <Spacer y={1} />
                      <Textarea
                        label="Entry"
                        name="content"
                        placeholder="Write about your gardening activities..."
                        fullWidth
                        onChange={handleInputChange}
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
                      {entry.image && (
                        <Image src={entry.image} alt="Journal Entry Image" />
                      )}
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
                  <Button type="submit" color="primary">
                    Save Entry
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </GTForm>
      </Modal>
    </>
  );
};

export default CreateGardenJournal;
