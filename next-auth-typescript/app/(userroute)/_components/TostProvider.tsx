"use client";
import React from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

let openNotificationWithIcon: (type: NotificationType, message?: string) => any;
const ToastProvider: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  openNotificationWithIcon = (type: NotificationType, message?: string) => {
    api[type]({
      message,
    });
  };

  return <>{contextHolder}</>;
};

export { openNotificationWithIcon, ToastProvider };
