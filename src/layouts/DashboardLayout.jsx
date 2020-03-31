import { Card, Layout, Menu } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const { Header } = Layout;

const Logo = styled.div`
  float: left;

  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;

  background: rgba(255, 255, 255, 0.2);
`;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  line-height: 64px;
`;

const StyledContent = styled(Layout.Content)`
  padding: 50px;
  padding-top: 16px;
`;

const StyledFooter = styled(Layout.Footer)`
  text-align: center;
`;

const menu = [
  {
    name: "Webhook",
    path: "/webhooks"
  },
  {
    name: "定时任务",
    path: "/schedules"
  },
  {
    name: "微信群机器人",
    path: "/bots"
  }
];

function DashboardLayout({ route }) {
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (
      selectedKeys.length === 0 ||
      selectedKeys[0] !== history.location.pathname
    ) {
      setSelectedKeys(
        menu
          .map(item => item.path)
          .filter(path => history.location.pathname.indexOf(path) === 0)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  if (!localStorage.getItem("token")) {
    history.push("/auth/login");
    return null;
  }

  return (
    <StyledLayout>
      <Header>
        <Logo />
        <StyledMenu
          mode="horizontal"
          selectedKeys={selectedKeys}
          theme="dark"
          onClick={item => history.push(item.key)}
        >
          {menu.map(item => (
            <Menu.Item key={item.path}>{item.name}</Menu.Item>
          ))}
        </StyledMenu>
      </Header>
      <StyledContent>
        <Card>{renderRoutes(route.routes)}</Card>
      </StyledContent>
      <StyledFooter>企业微信群机器人网关 ©2019</StyledFooter>
    </StyledLayout>
  );
}

DashboardLayout.propTypes = {
  route: PropTypes.object.isRequired
};

export default DashboardLayout;
