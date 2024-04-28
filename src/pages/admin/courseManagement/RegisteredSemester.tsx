import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";

const items = [
  { key: "UPCOMING", label: "Upcoming" },
  { key: "ONGOING", label: "Ongoing" },
  { key: "ENDED", label: "Ended" },
];

const RegisteredSemester = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const handleStatusDropdown = (data) => {
    console.log(data);
    
  };

  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };

  type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}> {item} </Tag>;
      },
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
        <Dropdown menu={menuProps}>
          <Button>Update</Button>
        </Dropdown>
      ),
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      status,
      startDate: moment(new Date(startDate)).format("DD MMMM YYYY"),
      endDate: moment(new Date(endDate)).format("DD MMMM YYYY"),
    })
  );

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

export default RegisteredSemester;
