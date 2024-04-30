import { Button, Col, Empty, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../redux/features/student/studentCourse.api";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourses } = useGetMyOfferedCoursesQuery(undefined);
  const [enrollCourse] = useEnrollCourseMutation();

  const singleObject = offeredCourses?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });

    return acc;
  }, {});

//   console.log(singleObject);

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = (id) => {
    const enrollData = {
      offeredCourse: id,
    };
    enrollCourse(enrollData);
  };

  if (!modifiedData.length) {
    return <Empty />;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item?.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
