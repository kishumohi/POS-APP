import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/CartItemCount.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch(ShowLoading());
      const res = await axios.post("/api/users/login", value);
      console.log("Front :- ", res);
      message.success("User Login Successfully!");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log("FRONT-Login_Page Error :- ", error);
    }
  };
  // currentry login user
  useEffect(() => {
    localStorage.getItem("auth");
    navigate("/");
  }, [navigate]);
  return (
    <div>
      <>
        <div className="register">
          <div className="register-form">
            <h1>POS APP</h1>
            <h4>Login Page</h4>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="userid" label="User ID">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <p>
                  not a user Please
                  <Link to="/register"> Register Here</Link>
                </p>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    </div>
  );
}

export default Login;
