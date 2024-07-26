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
  // Filter by Category
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ];
  // console.log(itemsData);
  const dispatch = useDispatch();
  // Initial State Define and Data Get From API
  const getAllItems = async () => {
    try {
      dispatch(ShowLoading());
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error From Get-Data From Server :- ", error);
    }
  };
  useEffect(() => {
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => {
              setSelectedCategory(category.name);
            }}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.imageUrl}
              height={40}
              width={60}
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item, index) => (
            <Col key={index} xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
