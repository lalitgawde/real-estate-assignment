import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import PropertyContext from "../../Context/PropertyContext";
import AppointmentContext from "../../Context/AppointmentsContext";
import styles from "./BuyerDashBoard.module.css";
import { sellers } from "../../data/sellers";
import { buyersList } from "../../data/buyers";

const BuyerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { properties } = useContext(PropertyContext);
  const { appointments } = useContext(AppointmentContext);

  const saved = properties.filter((p) => user?.savedProperties?.includes(p.id));

  let myAppointments = [];
  if (user) {
    myAppointments = appointments.filter((a) => a.buyerId === user.id);
  }

  return (
    <div className="page-container">
      {/* <h2>Buyer Dashboard</h2> */}
      <h3>Saved Properties</h3>
      {saved.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {saved.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.city}</td>
                <td>₹ {p.price.toLocaleString("en-IN")}</td>
                <td>
                  {p.approved ? (
                    <span className={styles["approved"]}>Approved</span>
                  ) : (
                    <span className={styles["pending"]}>Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved properties</p>
      )}
      <h3>Scheduled Appointments</h3>
      {myAppointments.length ? (
        <table>
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Property</th>
              <th>Seller</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((appointment) => {
              const property = properties.filter(
                (property) => property.id === appointment.propertyId,
              );
              const buyer = buyersList.filter(
                (buyer) => appointment.buyerId === buyer.id,
              );
              const seller = sellers.filter(
                (seller) => appointment.sellerId === seller.id,
              );
              return (
                <tr key={appointment.id}>
                  <td>{buyer[0].name}</td>
                  <td>{property[0].name}</td>
                  <td>{seller[0].name}</td>
                  <td>{appointment.type}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    {appointment.status === "Approved" ? (
                      <span className={styles["approved"]}>Approved</span>
                    ) : appointment.status === "Rejected" ? (
                      <span className={styles["rejected"]}>Rejected</span>
                    ) : (
                      <span className={styles["pending"]}>Pending</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No appointments</p>
      )}
    </div>
  );
};

export default BuyerDashboard;
