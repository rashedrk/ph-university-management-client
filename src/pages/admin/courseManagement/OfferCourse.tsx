import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHInput from "../../../components/form/PhInput";
import { TResponse } from "../../../types";
import { TCourses } from "../../../types/courseManagement.type";
import { useGetAcademicSemesterQuery, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PhSelectWithWatch";

const OfferCourse = () => {
  const { data: academicSemester } = useGetAcademicSemesterQuery(undefined);
  const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined);


  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const courseData = {
      ...data,
      credits: Number(data.credits),
      code: Number(data.code),
      preRequisiteCourses: data.preRequisiteCourses.map((item) => ({
        course: item,
      })),
    };

    console.log(courseData);

    // try {
    //   const res = (await addCourse(courseData)) as TResponse<TCourses>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester added successfully", { id: toastId });
    //   }
    //   // console.log(res);
    // } catch (error) {
    //   console.log(error);
    //   toast.error("something went wrong", { id: toastId });
    // }

    // console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelectWithWatch
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHInput type="text" label="Title" name="title" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
