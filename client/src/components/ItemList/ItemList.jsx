import React from "react";
import { Button, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/CartItemCount.js";

const { Meta } = Card;

function ItemList({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(updateCart({ ...item, quantity: 1 }));
  };
  return (
    <Card
      // hoverable
      style={{ width: 240, marginBottom: 20 }}
      cover={<img alt="example" src={item.image} style={{ height: 250 }} />}
    >
      <Meta title={item.name} />
      <div className="item-button">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </Card>
  );
}

export default ItemList;
