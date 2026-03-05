import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AppointmentModal.module.css";
import AuthContext from "../../Context/AuthContext";
import AppointmentContext from "../../Context/AppointmentsContext";
import NotificationContext from "../../Context/NotificationContext";

const AppointmentModal = ({ property, onClose, appointmentData }) => {
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);
  const { scheduleAppointment } = useContext(AppointmentContext);
  const [type, setType] = useState(
    () => appointmentData[0]?.type || "Video Call",
  );
  const [date, setDate] = useState(() => appointmentData[0]?.date || "");
  const [time, setTime] = useState(() => appointmentData[0]?.time || "");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleAppointment({
      propertyId: property.id,
      buyerId: user.id,
      type,
      date,
      time,
      sellerId: property.sellerId,
    });

    addNotification({
      id: Date.now().toString(),
      userId: property.sellerId,
      message: "You have a new appointment request.",
      read: false,
      date: new Date().toISOString().split("T")[0],
    });
    setConfirmed(true);
  };
  const dateRef = useRef(null);

  useEffect(() => {
    function getTodayISO() {
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    }
    if (dateRef.current) {
      dateRef.current.setAttribute("min", getTodayISO());
    }
  }, []);

  if (confirmed || appointmentData[0]) {
    return (
      <div className={styles["modal-overlay"]}>
        <div className={styles["modal"]}>
          <h3>✅ Appointment Scheduled</h3>
          <p>
            {type} scheduled on {date} at {time}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <h3>Schedule Appointment</h3>
        <form onSubmit={handleSubmit}>
          <label>Appointment Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Video Call</option>
            <option>Site Visit</option>
          </select>
          <label>Select Date</label>
          <input
            ref={dateRef}
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Select Time</label>
          <input
            type="time"
            required
            onChange={(e) => {
              let timeStr = e.target.value;
              timeStr =
                Number(timeStr.split(":")[0]) > 12
                  ? timeStr + " PM"
                  : timeStr + " AM";
              setTime(timeStr);
            }}
          />
          <div className={styles["modal-buttons"]}>
            <button type="submit">Confirm</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
