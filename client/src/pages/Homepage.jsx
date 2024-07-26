// import React from "react";

import { useEffect, useState } from "react";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import axios from "axios";
import ItemList from "../components/ItemList/ItemList.jsx";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/CartItemCount.js";

function Homepage() {
  // Declare Variable
  const [itemsData, setItemsData] = useState([]);
  console.log(itemsData);
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
  }, []);

  return (
    <DefaultLayout>
      <Row>
        {itemsData.map((item, index) => (
          <Col key={index} xs={24} lg={6} md={12} sm={6}>
            <ItemList item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
