import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type PHSelectWithWatchType = {
  label: string;
  name: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: PHSelectWithWatchType) => {
  const { control } = useFormContext();

  const inputValue = useWatch({
    name,
    control,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            disabled={disabled}
            style={{ width: "100%" }}
            {...field}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
