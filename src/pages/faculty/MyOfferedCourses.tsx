import { Button, Col, Flex } from "antd";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import PHForm from "../../components/form/PhForm";
import PHSelect from "../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyOfferedCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  //   console.log(facultyCoursesData);

  const navigate = useNavigate();

  const semesterOptions = facultyCoursesData?.data.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));
  const courseOptions = facultyCoursesData?.data.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`)
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester"
            name="semesterRegistration"
            options={semesterOptions}
          />
          <PHSelect label="Course" name="course" options={courseOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyOfferedCourses;
