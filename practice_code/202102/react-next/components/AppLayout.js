import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Row, Menu } from "antd";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="test">
          <Link href="/test">
            <a>테스트</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="etc">
          <Link href="/etc">
            <a>등등등!</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={12}>
          <div>나는 지금 넥스트 공부 중!</div>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
