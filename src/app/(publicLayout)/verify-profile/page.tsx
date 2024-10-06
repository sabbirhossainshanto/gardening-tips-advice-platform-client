"use client";

import { useUser } from "@/src/context/user.provider";
import { useVerifyProfile } from "@/src/hooks/profile";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const VerifyProfile = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(0);
  const { mutate: handleVerifyProfile } = useVerifyProfile();

  const handlePayment = (amount: number) => {
    setLoading(amount);
    const payload = {
      amount,
      user: user?._id,
    };
    handleVerifyProfile(payload, {
      onSuccess(data) {
        console.log(data);
        setLoading(0);
        if (data?.success) {
          window.location.href = data?.data?.payment_url;
        }
      },
      onError() {
        setLoading(0);
      },
    });
  };
  return (
    <div>
      <div className="container-box  md:flex items-center justify-between gap-10 space-y-10 md:space-y-0">
        <Card className="pt-4 w-full">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-success uppercase font-bold">Premium</p>
            <p className="text-default-500">1 month access!</p>
            <h4 className="font-bold text-large">What we provide ?</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-10">
            <div className="flex items-center">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    variant="light"
                    color="success"
                    size="sm"
                  />
                  <p>Access premium content!</p>
                </div>
                <div className="flex items-center gap-2">
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    variant="light"
                    color="success"
                    size="sm"
                  />
                  <p>Post premium content!</p>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-3xl">$100</h1>
              </div>
            </div>
          </CardBody>
          <CardFooter className=" bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <Button
              isLoading={loading === 100}
              onClick={() => handlePayment(100)}
            >
              Get Access
            </Button>
          </CardFooter>
        </Card>
        {/* <Card className="pt-4 w-full">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-success uppercase font-bold">Premium</p>
            <p className="text-default-500">6 month access!</p>
            <h4 className="font-bold text-large">What we provide ?</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-10">
            <div className="flex items-center">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    variant="light"
                    color="success"
                    size="sm"
                  />
                  <p>Access premium content!</p>
                </div>
                <div className="flex items-center gap-2">
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    variant="light"
                    color="success"
                    size="sm"
                  />
                  <p>Post premium content!</p>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-3xl">$300</h1>
              </div>
            </div>
          </CardBody>
          <CardFooter className=" bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <Button
              isLoading={loading === 300}
              onClick={() => handlePayment(300)}
            >
              Get Access
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
};

export default VerifyProfile;
