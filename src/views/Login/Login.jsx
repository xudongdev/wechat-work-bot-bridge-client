import { Button, Card, Form, Input } from "antd";
import useLogin from "hooks/useLogin";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 400px;
`;

const Title = styled.h1`
  text-align: center;
`;

function Login({ form: { getFieldDecorator, validateFields } }) {
  const [login, { loading }] = useLogin();

  const handleSubmit = event => {
    event.preventDefault();
    validateFields((err, variables) => {
      if (!err) {
        login({ variables });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>登录</title>
      </Helmet>

      <StyledCard>
        <Title>登录</Title>

        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "请输入电子邮箱!" },
                { type: "email", message: "电子邮箱格式不正确!" }
              ]
            })(<Input placeholder="电子邮箱" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(<Input placeholder="密码" type="password" />)}
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" loading={loading} type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </>
  );
}

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func
  }).isRequired
};

export default Form.create()(Login);
