import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <div>
      <>
        <div className="register">
          <div className="register-form">
            <h1>POS APP</h1>
            <h4>Rgister Page</h4>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="userId" label="User ID">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <p>
                  Already Register Please
                  <Link to="/login"> Login Here</Link>
                </p>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    </div>
  );
}

export default Register;
