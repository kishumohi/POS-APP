import React from "react";
import { Card } from "antd";

const { Meta } = Card;

function ItemList({ item }) {
  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: 20 }}
      cover={<img alt="example" src={item.image} style={{ height: 250 }} />}
    >
      <Meta title={item.name} />
    </Card>
  );
}

export default ItemList;
