import PropTypes from "prop-types";
import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  display: flex;
  overflow: auto;
  align-items: center;

  width: 100%;
  height: 100%;

  text-align: center;

  color: ${props => props.color};
  background: white;
  background-color: ${props => props.backgroundColor};
  -webkit-box-align: center;

  -ms-flex-align: center;
`;

const Spinner = styled.div`
  width: 100%;
  margin: auto;
  padding: 10% 0;

  text-align: center;
`;

const SpinnerWarp = styled.div`
  zoom: 1;

  max-width: 36em;
  margin: 0 auto;
  padding-right: 1em;
  padding-left: 1em;

  text-align: center;
`;

const SpinnerLoader = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto;
  margin-bottom: 21px;

  animation: ${rotate} 0.7s infinite linear;
  text-align: center;
`;

const SpinnerMessage = styled.div`
  color: #545454;
`;

function Loading({ backgroundColor, color, message }) {
  return (
    <StyledLoading backgroundColor={backgroundColor} color={color}>
      <Spinner>
        <SpinnerWarp>
          <SpinnerLoader>
            <svg viewBox="-270 364 66 66" xmlns="http://www.w3.org/2000/svg">
              <path d="M-237 428c-17.1 0-31-13.9-31-31s13.9-31 31-31v-2c-18.2 0-33 14.8-33 33s14.8 33 33 33 33-14.8 33-33h-2c0 17.1-13.9 31-31 31z" />
            </svg>
          </SpinnerLoader>
          <SpinnerMessage>{message}</SpinnerMessage>
        </SpinnerWarp>
      </Spinner>
    </StyledLoading>
  );
}

Loading.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  message: PropTypes.element
};

Loading.defaultProps = {
  backgroundColor: "#fff",
  color: "#197bbd",
  message: null
};

export default Loading;
