"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";

import Loading from "@/src/components/shared/Loading";
import { useGetPaymentHistory } from "@/src/hooks/payment";
import { IPaymentHistory } from "@/src/types/payment";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "Payment Status", uid: "status" },
  { name: "Amount", uid: "amount" },
];

export default function PaymentHistory() {
  const { data: paymentHistory, isLoading } = useGetPaymentHistory();
  console.log(paymentHistory);
  const renderCell = React.useCallback((payHistory: any, columnKey: string) => {
    const cellValue = payHistory[columnKey as keyof IPaymentHistory];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: payHistory?.user?.profilePhoto,
            }}
            description={payHistory?.user?.email}
            name={payHistory?.user?.name}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className={`text-bold text-sm capitalize`}>
              {payHistory?.user?.role}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={payHistory?.isPaid ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {payHistory.isPaid ? "Paid" : "Un Paid"}
          </Chip>
        );
      case "amount":
        return (
          <div className="flex flex-col">
            <p className={`text-bold text-sm capitalize`}>
              {payHistory?.amount}
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!paymentHistory?.data || paymentHistory?.data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50%]">
        No payment history available!
      </div>
    );
  }

  return (
    <>
      <div className="p-5">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "end" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={paymentHistory?.data}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
