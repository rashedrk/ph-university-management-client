import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PhForm";
import PHInput from "../../../components/form/PhInput";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    // console.log(data);
    const facultyData = {
      name: data.name,
    };

    // console.log(facultyData);

    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty added successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput type="text" label="Faculty Name" name="name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
