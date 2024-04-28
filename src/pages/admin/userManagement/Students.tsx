import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

const Students = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "limit", value: 3 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  //   console.log(semesterData);

  type TTableData = Pick<TStudent, "fullName" | "id">;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No",
      dataIndex: "id",
    },
    {
      title: "Action",
      render: () => (
        <Space>
          <Button>Detail</Button>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "1%",
    },
  ];

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
    console.log(filters, extra);
  };

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination onChange={(value) => setPage(value)} total={metaData?.total} pageSize={metaData?.limit} />
    </>
  );
};

export default Students;
