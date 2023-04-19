import { Button, notification } from "antd";

const NotificationC = ({ message }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      //   message: "Notification Title",
      message: message,
    });
  };
  return (
    <>
      {contextHolder}
      <Button onClick={() => openNotificationWithIcon("success")}>
        Success
      </Button>
      {/* <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
        <Button onClick={() => openNotificationWithIcon("warning")}>
          Warning
        </Button>
        <Button onClick={() => openNotificationWithIcon("error")}>Error</Button> */}
    </>
  );
};

export default NotificationC;
