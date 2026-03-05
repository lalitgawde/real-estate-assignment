import { createContext, useState } from "react";
import { notifications as notificationData } from "../data/notifications";

const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(notificationData);

  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
