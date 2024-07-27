import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/CartItemCount.js";
import axios from "axios";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch(ShowLoading());
      await axios.post("/api/users/register", value);
      message.success("User Register Successfully!");
      navigate("/login");
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log("FRONT-Register_Page Error :- ", error);
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
            <h4>Rgister Page</h4>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="userid" label="User ID">
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
