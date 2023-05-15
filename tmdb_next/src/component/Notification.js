import { notification } from "antd";
import { useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";

notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 2,
  rtl: true,
});

const Notification = ({ message, description }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: message,
      description: description,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    openNotification();
  }, []);

  return <div>{contextHolder}</div>;
};

export default Notification;
