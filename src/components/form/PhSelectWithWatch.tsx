import { Form, Select } from "antd";
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
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
}: PHSelectWithWatchType) => {
  const { control } = useFormContext();

  const inputValue = useWatch({
    name,
    control
  })

  console.log(inputValue);
  

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
