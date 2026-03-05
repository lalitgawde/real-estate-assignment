import React from "react";
import { useParams } from "react-router-dom";
// import { useProperty } from "../context/PropertyContext";
import { properties } from "../../data/properties";
// import styles from "./PropertyDetails.module.css";

const PropertyDetails = () => {
  const { id } = useParams();
  // const { properties } = useProperty();

  const property = properties.find((p) => p.id === id);

  if (!property) return <div>Property not found</div>;

  return (
    <div className="page-container">
      <h2>{property.name}</h2>
      <p>Price: ₹ {property.price.toLocaleString("en-IN")}</p>
      <p>
        Location: {property.city}, {property.locality}
      </p>
      <p>Configuration: {property.configuration}</p>
      <p>Possession: {property.possession}</p>

      <h4>Amenities:</h4>
      <ul>
        {property.amenities.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      {/* <div className={styles["video-placeholder"]}>
        Sample Flat Video */}
      <iframe
        width="100%"
        height="315"
        src={property.sampleFlatVideo}
        title="Sample Flat"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* </div> */}
    </div>
  );
};

export default PropertyDetails;
