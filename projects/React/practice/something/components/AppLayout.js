import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Header, Content, Footer, Sider } = Layout;

const ContentMargin = styled(Content)`
  margin: 0 16px;
`;

const AppLayout = ({ children }) => {
  const style = useMemo(() => ({ minHeight: "100vh" }), []);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };

  return (
    <div>
      <Layout style={style}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu mode="inline" theme="dark">
            <Menu.Item>
              <Link href="/">
                <a>Main</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link href="/option1">
                <a>option1</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link href="/option2">
                <a>option2</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <ContentMargin>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </ContentMargin>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
