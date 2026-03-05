import { useContext, useState } from "react";
import styles from "./NotificationBell.module.css";
import NotificationContext from "../../Context/NotificationContext";
import AuthContext from "../../Context/AuthContext";

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notifications, markAsRead } = useContext(NotificationContext);

  const userNotifications = notifications.filter(
    (notification) => notification.userId === user.id,
  );
  console.log("usernotification", userNotifications);
  return (
    <div className={styles["notification-container"]}>
      <span onClick={() => setIsNotificationOpen((prev) => !prev)}>
        🔔 ({userNotifications.filter((n) => !n.read).length})
      </span>
      {isNotificationOpen && (
        <div className={styles["notification-dropdown"]}>
          {userNotifications.length === 0 && <p>No notifications</p>}

          {userNotifications.map((n) => (
            <div
              key={n.id}
              className={n.read ? styles.read : styles.unread}
              onClick={() => markAsRead(n.id)}>
              <p>{n.message}</p>
              <p>{n.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
