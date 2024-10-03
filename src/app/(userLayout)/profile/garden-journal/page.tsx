"use client";

import CreateGardenJournal from "@/src/components/modal/CreateGardenJournal";
import { Card, Image } from "@nextui-org/react";

const journalEntries = [
  {
    title: "Planted New Seeds",
    content: "Today I planted some tomato seeds. Can't wait to see them grow!",
    image:
      "https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg",
  },
  {
    title: "First Bloom!",
    content:
      "My rose plant bloomed for the first time. Such a beautiful sight!",
    image:
      "https://i2-prod.mirror.co.uk/incoming/article33357519.ece/ALTERNATES/n615/1_Proud-gardener.jpg",
  },
  // Add more entries
];

export default function JournalEntryList() {
  return (
    <div>
      <div className="py-2.5 flex justify-end">
        <CreateGardenJournal />
      </div>
      <div className="container-box grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 p-5">
        {journalEntries.map((entry, index) => (
          <div key={index}>
            <Card isHoverable isPressable>
              {entry.image && (
                <Image
                  src={entry.image}
                  width="100%"
                  height={200}
                  alt="Journal Entry Image"
                />
              )}
              <Card>
                <div className="py-5">
                  <p>{entry.title}</p>
                  <p>{entry.content}</p>
                </div>
              </Card>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
