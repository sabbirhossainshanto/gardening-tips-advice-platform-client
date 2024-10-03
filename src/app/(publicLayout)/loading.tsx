import CardSkeleton from "@/src/components/CardSkeleton";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Posts() {
  return (
    <div className="container-box">
      <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-items">See All</Link>
        </Button>
      </div>
    </div>
  );
}
