import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectType = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[] | undefined;
  disabled?: boolean;
};

const PHSelect = ({ label, name, options, disabled }: PHSelectType) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
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

export default PHSelect;
