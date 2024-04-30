import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker format={"HH:mm"} {...field} style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
