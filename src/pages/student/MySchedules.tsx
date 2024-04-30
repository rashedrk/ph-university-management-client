import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MySchedules = () => {
  const { data } = useGetMyEnrolledCoursesQuery(undefined);
  return (
    <div>
      {data?.data?.map((item) => {
        return (
          <div>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((item) => (
                <span> {item}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedules;
