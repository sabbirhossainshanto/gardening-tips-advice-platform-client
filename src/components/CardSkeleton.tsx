import { CardFooter, Card as NextUiCard } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const CardSkeleton = () => {
  return (
    <div className="container-box">
      <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <NextUiCard
            key={i}
            className="h-[300px] w-full rounded-3xl card-skeleton"
          >
            <Skeleton className="rounded-lg">
              <div className="h-60 rounded-lg bg-default-300" />
            </Skeleton>
            <CardFooter className="mt-auto">
              <Skeleton className=" w-full rounded-full">
                <div className="h-14 w-full rounded-full bg-default-200" />
              </Skeleton>
            </CardFooter>
          </NextUiCard>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
