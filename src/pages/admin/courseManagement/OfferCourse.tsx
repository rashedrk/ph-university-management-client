import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useOfferCourseMutation,
} from "../../../redux/features/admin/courseManagement.api";
import PHInput from "../../../components/form/PhInput";
import { TResponse } from "../../../types";
import { TCourses } from "../../../types/courseManagement.type";
import {
  useGetAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import { useState } from "react";
import { weekdaysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PhTimePicker";
import moment from "moment";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const { data: registeredSemester } = useGetAllRegisteredSemesterQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
    { name: "status", value: "ONGOING" },
  ]);
  const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined);
  const { data: academicDepartment } = useGetAcademicDepartmentQuery(undefined);
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculties, isLoading } = useGetCourseFacultiesQuery(
    courseId,
    {
      skip: !courseId,
    }
  );

  const [createOfferCourse] = useOfferCourseMutation();

  const registeredSemesterOptions = registeredSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const coursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const courseFacultiesOptions = courseFaculties?.data?.faculties?.map(
    (item) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const courseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm'),
    };

    // console.log(courseData);

    try {
      const res = (await createOfferCourse(courseData)) as TResponse<TCourses>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course offered successfully", { id: toastId });
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { id: toastId });
    }

    // console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Registered Semesters"
            name="semesterRegistration"
            options={registeredSemesterOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            label="Course"
            name="course"
            options={coursesOptions}
          />
          <PHSelect
            disabled={isLoading || !courseId}
            label="Faculty"
            name="faculty"
            options={courseFacultiesOptions}
          />
          <PHSelect
            mode="multiple"
            label="Days"
            name="days"
            options={weekdaysOptions}
          />

          <PHInput type="number" label="Section" name="section" />
          <PHInput type="number" label="Max Capacity" name="maxCapacity" />
          <PHTimePicker label="Start Time" name="startTime" />
          <PHTimePicker label="End Time" name="endTime" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
