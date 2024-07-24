import React from "react";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
  DeleteFromCart,
  MinusItemCart,
  PulsItemCart,
} from "../redux/CartItemCount.js";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
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
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
    </DefaultLayout>
  );
}

export default CartPage;
