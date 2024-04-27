import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PhSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  label: String(currentYear + number),
  value: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    // console.log(data);
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, {id: toastId});
      } else {
        toast.success("Semester added successfully", {id: toastId});
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {id: toastId});
    }

    // console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
