import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory } from "../services/Payment";
import { IResponse } from "../types";
import { IPaymentHistory } from "../types/payment";

export const useGetPaymentHistory = () => {
  return useQuery<any, Error, IResponse<IPaymentHistory[]>>({
    queryKey: ["payments"],
    queryFn: async () => await getPaymentHistory(),
  });
};
