/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

// const items: MenuProps["items"] = [
//   {
//     key: "Dashboard",
//     label: <NavLink to={"/admin/dashboard"}> Dashboard</NavLink>,
//   },
//   {
//     key: "User Management",
//     label: "User Management",
//     children: [
//       {
//         key: "Create Admin",
//         label: <NavLink to={"/admin/create-admin"}> Create Admin</NavLink>,
//       },
//       {
//         key: "Create Faculty",
//         label: <NavLink to={"/admin/create-faculty"}> Create Faculty</NavLink>,
//       },
//       {
//         key: "Create Student",
//         label: <NavLink to={"/admin/create-student"}> Create Student</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const useDispatch = useAppDispatch();

  const handleLogout = () => {
    useDispatch(logout());
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} >
          <Button onClick={handleLogout}>LogOut</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
