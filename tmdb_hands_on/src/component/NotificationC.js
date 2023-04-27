import { notification } from "antd";
import { useEffect } from "react";

notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3,
  rtl: true,
});

const NotificationC = ({ message, text }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    openNotificationWithIcon(text);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {contextHolder}
      {/* <Button onClick={() => openNotificationWithIcon("success")}>
        Success
      </Button> */}
      {/* <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
        <Button onClick={() => openNotificationWithIcon("warning")}>
          Warning
        </Button>
        <Button onClick={() => openNotificationWithIcon("error")}>Error</Button>  */}
    </>
  );
};

export default NotificationC;
