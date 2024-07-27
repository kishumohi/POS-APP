import { useEffect, useState } from "react";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import {
  DeleteFromCart,
  MinusItemCart,
  PulsItemCart,
} from "../redux/CartItemCount.js";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const navigate = useNavigate();

  //   console.log(cartItems);
  // handle function
  const handleIncrement = (record) => {
    dispatch(PulsItemCart({ id: record._id }));
  };
  const handleDecrement = (record) => {
    dispatch(MinusItemCart({ id: record._id }));
  };
  const handleDelete = (record) => {
    dispatch(DeleteFromCart({ id: record._id }));
  };

  // table column details
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img, record) => (
        <img src={img} alt={record.name} height={60} width={60} />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);
  // handle Function
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userid: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("http://localhost:8080/api/bills/add-bills", newObject);
      message.success("Bill Generated.");
      navigate("/bills");
    } catch (error) {
      console.log("FRONT-Bill Submit Error :- ", error);
    }

    // console.log(newObject);
  };
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUBT TOTAL : <b>{subTotal} /-</b>
        </h3>
        <Button onClick={() => setBillPopup(true)}>Create Invoice</Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopup}
        footer={false}
        onCancel={() => setBillPopup(false)}
      >
        <Form
          layout="vertical"
          // initialValues={editItem}
          onFinish={handleSubmit}
        >
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Customer Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentmode" label="Payment Methods">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{subTotal}</b>
            </h5>
            <h4>
              Tax - <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              Grand Total -{" "}
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              SAVE
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}

export default CartPage;
