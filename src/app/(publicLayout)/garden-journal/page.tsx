"use client";

import { useGetGardenJournal } from "@/src/hooks/garden-journal";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";

const GardenJournals = () => {
  const { data } = useGetGardenJournal();

  console.log(data);
  console.log(data);
  return (
    <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-4 p-5">
      {data?.data?.map((entry, index) => (
        <div key={index}>
          <Card className="p-3">
            <div className="flex gap-3 mb-3">
              <Image
                className="rounded-full"
                src={entry.user?.profilePhoto}
                width="100%"
                height={35}
                alt="Journal Entry Image"
              />
              <div>
                <p>{entry?.user?.name}</p>
                <p className="text-sm">{entry?.user?.email}</p>
              </div>
            </div>
            <h2 className="font-semibold text-lg py-3">{entry?.title}</h2>
            {entry.image && (
              <Image
                className="object-cover object-center"
                src={entry.image}
                width="100%"
                height={200}
                alt="Journal Entry Image"
              />
            )}
            <CardFooter>
              <div className="py-5">
                <p>{entry.content}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default GardenJournals;
