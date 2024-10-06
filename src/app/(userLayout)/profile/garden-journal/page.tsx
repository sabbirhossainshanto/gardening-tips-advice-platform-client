"use client";

import CreateGardenJournal from "@/src/components/modal/CreateGardenJournal";
import UpdateGardenJournal from "@/src/components/modal/UpdateGardenJournal";
import {
  useDeleteGardenJournal,
  useGetMyGardenJournal,
} from "@/src/hooks/garden-journal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useState } from "react";

export default function JournalEntryList() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setId] = useState("");
  const queryClient = useQueryClient();
  const { data } = useGetMyGardenJournal();
  const { mutate: deleteJournal } = useDeleteGardenJournal();
  const deleteGardenJournal = (id: string) => {
    deleteJournal(id, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get_my_journals"] });
      },
    });
  };

  if (id && showUpdateModal) {
    return (
      <UpdateGardenJournal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        id={id}
      />
    );
  }

  return (
    <>
      <div>
        <div className="py-2.5 flex justify-end">
          <CreateGardenJournal />
        </div>
        {data?.data && data?.data?.length > 0 ? (
          <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
            {data?.data?.map((entry, index) => (
              <div key={index}>
                <Card className="p-3">
                  <CardHeader>
                    <p className="absolute top-1 right-1  px-2 text-tiny uppercase">
                      {entry?.isPublic ? "Public" : "Private"}
                    </p>
                    <h2 className="font-semibold text-lg py-3">
                      {entry?.title}
                    </h2>
                  </CardHeader>
                  <CardBody>
                    {entry.image && (
                      <Image
                        className="object-cover object-center"
                        src={entry.image}
                        width="100%"
                        height={200}
                        alt="Journal Entry Image"
                      />
                    )}
                    <div className="py-5">
                      <p>{entry.content}</p>
                    </div>
                  </CardBody>
                  <CardFooter className="bg-[#a8b3cf33]">
                    <div className="flex items-center gap-4">
                      <Button onClick={() => deleteGardenJournal(entry?._id)}>
                        <DeleteIcon size={18} className="text-danger" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowUpdateModal(true);
                          setId(entry?._id);
                        }}
                      >
                        <EditIcon size={18} className="text-success" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <h2>You dont have any post yet!</h2>
          </div>
        )}
      </div>
    </>
  );
}
