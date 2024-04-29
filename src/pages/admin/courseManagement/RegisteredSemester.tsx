import { Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";

const items = [
  { key: "UPCOMING", label: "Upcoming" },
  { key: "ONGOING", label: "Ongoing" },
  { key: "ENDED", label: "Ended" },
];

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const [updateSemesterStatus] = useUpdateSemesterStatusMutation();

  const handleStatusDropdown:  MenuProps['onClick'] = (data) => {
    const semesterUpdateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(semesterUpdateData);
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
      render: (item) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button onClick={() => setSemesterId(item.key)}>Update</Button>
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
