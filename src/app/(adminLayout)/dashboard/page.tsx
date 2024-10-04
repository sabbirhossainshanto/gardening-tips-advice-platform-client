"use client";

import Loading from "@/src/components/shared/Loading";
import { useGetMonthlyStats } from "@/src/hooks/user";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const Dashboard = () => {
  const { data, isLoading } = useGetMonthlyStats();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data) {
    return;
  }

  const { postStats, userStats, verifiedUserStats } = data?.data;

  return (
    <div className="container-box p-2.5">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Today User</h2>
              <p>{userStats?.todayUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last Seven Days User</h2>
              <p>{userStats?.lastSevenDaysUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last One Month User</h2>
              <p>{userStats?.lastMonthUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Total User</h2>
              <p>{userStats?.totalUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Today Posts</h2>
              <p>{postStats?.todayPosts}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last Seven Days Posts</h2>
              <p>{postStats?.lastSevenDaysPosts}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last One Month Posts</h2>
              <p>{postStats?.lastMonthPosts}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Total Posts</h2>
              <p>{postStats?.totalPosts}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Today Verified User</h2>
              <p>{verifiedUserStats?.todayVerifiedUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last Seven Days Verified User</h2>
              <p>{verifiedUserStats?.lastSevenDaysVerifiedUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Last Month Verified User</h2>
              <p>{verifiedUserStats?.lastMonthVerifiedUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Total Verified User</h2>
              <p>{verifiedUserStats?.totalVerifiedUsers}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="h-[100px]" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="flex flex-col items-center justify-center h-full">
              <h2>Total Balance</h2>
              <p className="text-success">
                {verifiedUserStats?.totalVerifiedUserPayments}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
