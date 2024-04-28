import { Button, Table, TableColumnsType } from "antd";
import { TAcademicSemester } from "../../../types";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";

const RegisteredSemester = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  type TTableData = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
  >;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Actions",
      render: () => (
        <>
          <Button>Update</Button>
        </>
      ),
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      status,
      startDate,
      endDate,
    })
  );

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

export default RegisteredSemester;
