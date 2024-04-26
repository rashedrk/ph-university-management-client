import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PhSelect";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  label: String(currentYear + number),
  value: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
    };
    console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
