import { createContext, useState } from "react";
import { appointments } from "../data/appointment";

const AppointmentContext = createContext({
  appointments: [],
  scheduleAppointment: () => {},
  changeAppointmentStatus: () => {},
});

export const AppointmentProvider = ({ children }) => {
  const [appointmentState, setAppointmentState] = useState(appointments);

  const scheduleAppointment = (appointment) => {
    setAppointmentState((prev) => [
      ...prev,
      { ...appointment, id: Date.now(), status: "Pending" },
    ]);
  };

  const changeAppointmentStatus = (id, status) => {
    setAppointmentState((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment }
          : { ...appointment, status: status },
      ),
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments: appointmentState,
        scheduleAppointment,
        changeAppointmentStatus,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
