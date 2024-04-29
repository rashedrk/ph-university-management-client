import { Button, Modal, Table } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PhSelect";
import {
  useAssignFacultiesMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/userManagement.api";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  //   console.log(semesterData);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => <AssignFacultiesModal courseInfo={item} />,
      width: "1%",
    },
  ];

  const tableData = courses?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));

  return <Table columns={columns} loading={isFetching} dataSource={tableData} />;
};

const AssignFacultiesModal = ({ courseInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties] = useAssignFacultiesMutation();

  const faucltyOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const facultiesData = {
      courseId: courseInfo.key,
      data,
    };
    assignFaculties(facultiesData);
    // console.log(facultiesData);
    
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculties</Button>
      <Modal
        title="Assign Faculties"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleFormSubmit}>
          <PHSelect
            mode="multiple"
            options={faucltyOptions}
            name="faculties"
            label="Select Faculty"
          />
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
