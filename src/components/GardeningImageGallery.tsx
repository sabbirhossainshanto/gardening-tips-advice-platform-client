"use client";

import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export default function GardeningImageGallery() {
  return (
    <div className="container-box gap-2 grid grid-cols-12 grid-rows-2 px-8">
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Gardening Tips
          </p>
          <h4 className="text-white font-medium text-large">
            Best Plants for Your Garden
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Gardening example 1"
          className="z-0 w-full h-full object-cover"
          src="https://i2-prod.mirror.co.uk/incoming/article33357519.ece/ALTERNATES/n615/1_Proud-gardener.jpg"
        />
      </Card>

      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Environment
          </p>
          <h4 className="text-white font-medium text-large">
            How to Plant a Tree the Right Way
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Gardening example 2"
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/card-example-3.jpeg"
        />
      </Card>

      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Garden Maintenance
          </p>
          <h4 className="text-white font-medium text-large">
            Essential Gardening Tools for Beginners
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Gardening example 3"
          className="z-0 w-full h-full object-cover"
          src="https://cdn.shopify.com/s/files/1/1740/1449/files/Planting_How_To.jpg?v=1599084184"
        />
      </Card>

      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Plants</p>
          <h4 className="text-black font-medium text-2xl">
            Growing Indoor Plants Successfully
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Gardening example 4"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified for updates.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Gardening Guide
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Tips for a Healthy Garden This Spring
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Gardening example 5"
          className="z-0 w-full h-full object-cover"
          src="https://www.gardenia.net/wp-content/uploads/2023/02/shutterstock_170315264Optimized-1.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Garden App Icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://www.gardenia.net/wp-content/uploads/2023/02/shutterstock_170315264Optimized-1.jpg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Garden App</p>
              <p className="text-tiny text-white/60">
                Track your plants growth.
              </p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
