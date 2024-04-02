import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { AdminHeader, AdminSider } from ".";
import "./AdminLayout.css";

const { Content } = Layout;

export const AdminLayout = () => {
  return (
    <Layout className="w-screen h-screen relative">
      <AdminHeader />
      <Layout>
        <AdminSider />
        <Content style={{ margin: 0, minHeight: "calc(100vh - 76px)" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
