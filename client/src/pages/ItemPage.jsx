// import React from "react";

import { useDispatch } from "react-redux";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { HideLoading, ShowLoading } from "../redux/CartItemCount.js";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function ItemPage() {
  // Declare Variable
  const [itemsData, setItemsData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // console.log(itemsData);
  // hook define

  const dispatch = useDispatch();
  // Initial State Define and Data Get From API
  const getAllItems = async () => {
    try {
      dispatch(ShowLoading());
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      dispatch(HideLoading());
    } catch (error) {
      console.log("Error From Get-Data From Server :- ", error);
    }
  };
  useEffect(() => {
    getAllItems();
  }, [dispatch]);
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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModel(true);
            }}
          />{" "}
          <DeleteOutlined style={{ cursor: "pointer" }} />
        </div>
      ),
    },
  ];
  // handle submit
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch(ShowLoading());
        const res = await axios.post("/api/items/add-item", value);
        message.success("Item Added Successfully");
        getAllItems();
        dispatch(HideLoading());
        setPopupModel(false);
      } catch (error) {
        message.success("Item Added Failed!!");
        console.log("Error From Post- Save Data From Server :- ", error);
      }
    } else {
      try {
        dispatch(ShowLoading());
        await axios.put("/api/items/edit-item", {
          ...value,
          itemid: editItem._id,
        });
        message.success("Item Updated Successfully");
        getAllItems();
        dispatch(HideLoading());
        setPopupModel(false);
      } catch (error) {
        message.success("Item Added Failed!!");
        console.log("Error From Post- Save Data From Server :- ", error);
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>List Items</h1>
        <Button type="primary" onClick={() => setPopupModel(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {popupModel && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          visible={popupModel}
          onCancel={() => {
            setEditItem(null);
            setPopupModel(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">noodles</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default ItemPage;
