import React from "react";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const LoadingCard = () => {
  return (
    <Card
      style={{
        width: 300,
        marginTop: 16,
      }}
      loading={true}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default LoadingCard;
