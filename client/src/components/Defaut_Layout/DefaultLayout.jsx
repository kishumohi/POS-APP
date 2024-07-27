import { useState } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./Default.Layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Spinner.jsx";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const loadingState = useSelector((state) => state.loading);
  // console.log(cartItems);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      {loadingState && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1 className="text-center text-light font-wight-bold">POS</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          /*
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
          */
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills" style={{ textDecoration: "none" }}>
              Bills
            </Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items" style={{ textDecoration: "none" }}>
              Items
            </Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<CustomerServiceOutlined />}>
            <Link to="/customers" style={{ textDecoration: "none" }}>
              Customers
            </Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="cart-item-count" onClick={() => navigate("/cart")}>
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
