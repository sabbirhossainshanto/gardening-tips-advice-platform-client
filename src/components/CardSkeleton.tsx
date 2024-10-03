import { CardFooter, Card as NextUiCard } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const CardSkeleton = () => {
  return (
    <NextUiCard className="h-[300px] w-full rounded-3xl">
      <Skeleton className="rounded-lg">
        <div className="h-60 rounded-lg bg-default-300" />
      </Skeleton>
      <CardFooter className="mt-auto">
        <Skeleton className=" w-full rounded-full">
          <div className="h-14 w-full rounded-full bg-default-200" />
        </Skeleton>
      </CardFooter>
    </NextUiCard>
  );
};

export default CardSkeleton;
