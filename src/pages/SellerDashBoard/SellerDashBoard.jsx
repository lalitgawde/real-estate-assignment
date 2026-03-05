import { useContext, useState } from "react";
import { inquiries } from "../../data/buyerInqury";
import styles from "./SellerDashboard.module.css";
import PropertyContext from "../../Context/PropertyContext";
import AppointmentContext from "../../Context/AppointmentsContext";
// import { sellers } from "../../data/sellers";
import { buyersList } from "../../data/buyers";
import AuthContext from "../../Context/AuthContext";
import NotificationContext from "../../Context/NotificationContext";

const dashboard_list = [
  "Add Property",
  "View Inquiery",
  "View Scheduled Appointments",
];

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeList, setActiveList] = useState("Add Property");
  const { properties, addProperty } = useContext(PropertyContext);
  const { addNotification } = useContext(NotificationContext);
  const { appointments, changeAppointmentStatus } =
    useContext(AppointmentContext);

  let myAppointments = [];
  if (user) {
    myAppointments = appointments.filter((a) => a.sellerId === user.id);
  }

  let sellerInquiry = [];
  if (user) {
    sellerInquiry = inquiries.filter((inquiry) => inquiry.sellerId === user.id);
  }

  const [form, setForm] = useState({
    name: "",
    price: "",
    city: "",
    locality: "",
    configuration: "1BHK",
    possession: "Ready",
    videoUrl: "",
    possessionDate: "",
    description: "",
    amenities: "",
    phone: "",
    isPremium: false,
    coordinates: { lat: 18.5993, lng: 73.7286 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(form);
    setForm({
      name: "",
      price: "",
      city: "",
      locality: "",
      configuration: "1BHK",
      possession: "Ready",
      videoUrl: "",
      possessionDate: "",
      description: "",
      amenities: "",
      phone: "",
      isPremium: false,
      coordinates: { lat: 18.5993, lng: 73.7286 },
    });
    alert("Property submitted for admin approval");
  };

  const onAddNotificationHandler = (appointment, msg) => {
    addNotification({
      id: new Date.toString(),
      userId: appointment.buyerId,
      message: `Your appointment has been ${msg}.`,
      read: false,
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="page-container">
      <h2>Seller Dashboard</h2>
      <div className={styles.actions}>
        {dashboard_list.map((item) => {
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
      {activeList === dashboard_list[0] && (
        <section className={styles["seller-form-section"]}>
          <h3>Add New Property</h3>
          <div className={styles["seller-form"]}>
            <input
              placeholder="Property Name"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              placeholder="City"
              required
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              placeholder="Locality"
              required
              onChange={(e) => setForm({ ...form, locality: e.target.value })}
            />
            <input
              placeholder="Amenities"
              onChange={(e) => setForm({ ...form, amenities: e.target.value })}
            />
            <textarea
              placeholder="Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="date"
              required
              placeholder="possessionDate"
              onChange={(e) =>
                setForm({ ...form, possessionDate: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setForm({ ...form, configuration: e.target.value })
              }
              required>
              <option>1BHK</option>
              <option>2BHK</option>
              <option>3BHK</option>
            </select>
            <select
              onChange={(e) => setForm({ ...form, possession: e.target.value })}
              required>
              <option>Ready</option>
              <option>6 Months</option>
              <option>1 Year</option>
            </select>
            <input
              placeholder="Video URL (YouTube)"
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            />
            <input
              placeholder="Contact Phone"
              required
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div></div>
            <div className={styles["premium-toggle"]}>
              <input
                type="checkbox"
                name="isPremium"
                checked={form.isPremium}
                onChange={() =>
                  setForm({ ...form, isPremium: !form.isPremium })
                }
              />
              <label style={{ fontSize: "13px" }}>
                Mark as Premium Listing
              </label>
            </div>
          </div>
          <button onClick={handleSubmit} className={styles.button}>
            Add Property
          </button>
        </section>
      )}
      {activeList === dashboard_list[1] && (
        <section className={styles["seller-section"]}>
          <h3>Buyer Inquiries</h3>
          {sellerInquiry.length ? (
            <table>
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Property</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sellerInquiry.map((inquiry) => {
                  const property = properties.filter(
                    (property) => property.id === inquiry.propertyId,
                  );
                  const buyer = buyersList.filter(
                    (buyer) => inquiry.buyerId === buyer.id,
                  );
                  // const seller = sellers.filter(
                  //   (seller) => inquiry.sellerId === seller.id,
                  // );
                  return (
                    <tr key={inquiry.id}>
                      <td>{buyer[0].name}</td>
                      <td>{property[0].name}</td>
                      {/* <td>{seller[0].name}</td> */}
                      <td>{inquiry.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No Inquiries</p>
          )}
        </section>
      )}

      {activeList === dashboard_list[2] && (
        <>
          <h3>Scheduled Appointments</h3>
          {myAppointments.length ? (
            <table>
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Property</th>
                  {/* <th>Seller</th> */}
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                  // const seller = sellers.filter(
                  //   (seller) => appointment.sellerId === seller.id,
                  // );
                  return (
                    <tr key={appointment.id}>
                      <td>{buyer[0].name}</td>
                      <td>{property[0].name}</td>
                      {/* <td>{seller[0].name}</td> */}
                      <td>{appointment.type}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        {appointment.status === "Approved" ? (
                          <span className={styles["approved"]}>Approved</span>
                        ) : appointment.status === "Rejected" ||
                          appointment.status === "Cancelled" ? (
                          <span className={styles["rejected"]}>
                            {appointment.status}
                          </span>
                        ) : (
                          <span className={styles["pending"]}>Pending</span>
                        )}
                      </td>
                      <td>
                        {(appointment.status === "Pending" ||
                          appointment.status === "Rejected") && (
                          <button
                            className={
                              appointment.status === "Rejected"
                                ? styles["reject-btn"]
                                : styles["approve-btn"]
                            }
                            onClick={() => {
                              changeAppointmentStatus(
                                appointment.id,
                                "Approved",
                              );
                              onAddNotificationHandler(appointment, "Approved");
                            }}>
                            Approve
                          </button>
                        )}
                        {appointment.status === "Approved" && (
                          <button
                            className={styles["reject-btn"]}
                            onClick={() => {
                              changeAppointmentStatus(
                                appointment.id,
                                "Rejected",
                              );
                              onAddNotificationHandler(appointment, "Rejected");
                            }}>
                            Reject
                          </button>
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
        </>
      )}
    </div>
  );
};

export default SellerDashboard;
