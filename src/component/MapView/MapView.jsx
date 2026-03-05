import styles from "./MapView.module.css";

const MapView = ({ properties }) => {
  if (!properties.length) {
    return <p>No properties to show on map</p>;
  }

  return (
    <div className={styles["map-container"]}>
      <iframe
        title="Google Map"
        width="100%"
        height="400"
        loading="lazy"
        src={`https://maps.google.com/maps?q=${properties[0].coordinates.lat},${properties[0].coordinates.lng}&z=12&output=embed`}></iframe>

      <div className={styles["map-info"]}>
        {properties.map((p) => (
          <div key={p.id} className={styles["map-property"]}>
            {p.name} - ₹ {p.price.toLocaleString("en-IN")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
