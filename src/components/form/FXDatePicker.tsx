import { IInput } from "@/src/types";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

interface IProps extends IInput {}

const FXDatePicker = ({ name, label, variant }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...field } }) => (
        <DatePicker
          {...field}
          label={label}
          variant={variant}
          className="min-w-full sm:min-w-[225px]"
        />
      )}
    />
  );
};

export default FXDatePicker;
