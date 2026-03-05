import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PropertyCard.module.css";
import AuthContext from "../../Context/AuthContext";
import unsave from "../../images/save-instagram (1).png";
import save from "../../images/save-instagram.png";
import AppointmentContext from "../../Context/AppointmentsContext";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { sellers } from "../../data/sellers";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { user, toggleSaveProperty } = useContext(AuthContext);
  const { appointments } = useContext(AppointmentContext);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  let isAppointmentPresent = [];
  if (user) {
    isAppointmentPresent = appointments?.filter(
      (appointment) =>
        appointment?.propertyId === property?.id &&
        appointment?.buyerId === user?.id,
    );
  }

  const sellerObj = sellers.filter((seller) => seller.id === property.sellerId);

  const handleSchedule = () => {
    setIsAppointmentModalOpen(true);
  };

  return (
    <>
      {isAppointmentModalOpen && (
        <AppointmentModal
          property={property}
          appointmentData={isAppointmentPresent}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}
      <div className={styles["card"]}>
        {property?.isPremium && (
          <span className={styles["premium-badge"]}>Premium</span>
        )}
        <h3>{property.name}</h3>
        <p>
          {property.city}, {property.locality}
        </p>
        <p>{property.configuration}</p>
        <p className={styles["price"]}>
          ₹ {property.price.toLocaleString("en-IN")}
        </p>
        <p>Seller Name: {sellerObj[0].name}</p>
        <div className={styles.actions}>
          <button onClick={() => navigate(`/property/${property.id}`)}>
            View Details
          </button>
          {user?.role === "buyer" &&
            (user.savedProperties.includes(property.id) ? (
              <img
                src={unsave}
                alt="unsave"
                onClick={() => toggleSaveProperty(property.id)}
              />
            ) : (
              <img
                src={save}
                alt="unsave"
                onClick={() => toggleSaveProperty(property.id)}
              />
            ))}
        </div>
        {user?.role === "buyer" && (
          <button onClick={handleSchedule}>Schedule Visit</button>
        )}
      </div>
    </>
  );
};

export default PropertyCard;
