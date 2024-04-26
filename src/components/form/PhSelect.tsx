import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectType = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

const PHSelect = ({ label, name, options }: PHSelectType) => {
  return (
    <Controller
      name={name}
      render={(fields) => (
        <Form.Item label={label}>
          <Select style={{ width: "100%" }} {...fields} options={options} />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
