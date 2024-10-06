"use client";

import { IInput } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";
import { useFormContext } from "react-hook-form";
interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}
const GTSelect = ({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
}: IProps) => {
  const { register } = useFormContext();
  return (
    <Select
      isDisabled={disabled}
      variant={variant}
      label={label}
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default GTSelect;
