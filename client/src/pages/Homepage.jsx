// import React from "react";

import { useEffect, useState } from "react";
import DefaultLayout from "../components/Defaut_Layout/DefaultLayout.jsx";
import axios from "axios";
import ItemList from "../components/ItemList/ItemList.jsx";
import { Col, Row } from "antd";

function Homepage() {
  // Declare Variable
  const [itemsData, setItemsData] = useState([]);
  // console.log(itemsData);
  // Initial State Define and Data Get From API
  useEffect(() => {
    const getAllItems = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/items/get-item"
      );
      setItemsData(data);
      try {
      } catch (error) {
        console.log("Error From Get-Data From Server :- ", error);
      }
    };
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
