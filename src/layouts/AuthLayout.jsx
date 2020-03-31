import PropTypes from "prop-types";
import React from "react";
import { renderRoutes } from "react-router-config";
import styled from "styled-components";

const StyledAuthLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

function AuthLayout({ route }) {
  return <StyledAuthLayout>{renderRoutes(route.routes)}</StyledAuthLayout>;
}

AuthLayout.propTypes = {
  route: PropTypes.object.isRequired
};

export default AuthLayout;
