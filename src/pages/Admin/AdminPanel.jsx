import { useContext, useState } from "react";
import PropertyContext from "../../Context/PropertyContext";
// import { users } from "../../data/user";
import { buyersList as buyers } from "../../data/buyers";
import { sellers } from "../../data/sellers";
import styles from "./AdminPanel.module.css";
import BuyerTable from "../../component/BuyerTable/BuyerTable";
import SellerTable from "../../component/SellerTable/SellerTable";
import AppointmentContext from "../../Context/AppointmentsContext";

const admin_list = [
  "Property List",
  "Registered Buyers",
  "Registered Sellers",
  "Scheduled Appointments",
];

const AdminPanel = () => {
  const { properties, approveProperty, rejectProperty } =
    useContext(PropertyContext);
  const { appointments } = useContext(AppointmentContext);
  const [activeList, setActiveList] = useState("Property List");
  // const buyers = buyersList.filter((u) => u.role === "buyer");
  // const sellers = users.filter((u) => u.role === "seller");

  const appointmentsData = appointments.map((appointment) => {
    const property = properties.filter(
      (property) => property.id === appointment.propertyId,
    );
    const buyer = buyers.filter((buyer) => appointment.buyerId === buyer.id);
    const seller = sellers.filter(
      (seller) => appointment.sellerId === seller.id,
    );

    return {
      ...appointment,
      propertyId: property,
      buyerId: buyer,
      sellerId: seller,
    };
  });

  return (
    <div className="page-container">
      <h2>Admin Panel</h2>
      <div className={styles.actions}>
        {admin_list.map((item) => {
          const activeClasses = `${item === activeList ? styles.active : ""}`;
          return (
            <button
              onClick={() => setActiveList(item)}
              key={item}
              className={activeClasses}>
              {item}
            </button>
          );
        })}
      </div>
      {activeList === admin_list[0] && (
        <section className={styles["admin-section"]}>
          <h3>All Property Listings</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
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
                  <td>
                    {!p.approved && (
                      <button
                        className={styles["approve-btn"]}
                        onClick={() => approveProperty(p.id)}>
                        Approve
                      </button>
                    )}
                    {p.approved && (
                      <button
                        className={styles["reject-btn"]}
                        onClick={() => rejectProperty(p.id)}>
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <section className={styles["admin-section"]}>
        {activeList === admin_list[1] && (
          <>
            <h3>Registered Buyers</h3>
            <BuyerTable buyers={buyers} />
          </>
        )}
        {activeList === admin_list[2] && (
          <>
            <h3>Registered Sellers</h3>
            <SellerTable sellers={sellers} />
          </>
        )}
      </section>
      {activeList === admin_list[3] && (
        <section className={styles["admin-section"]}>
          <h3>All Scheduled Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {console.log("appointmentsData", appointmentsData)}
              {appointmentsData.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.buyerId[0].name}</td>
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
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default AdminPanel;
