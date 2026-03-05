import React from "react";
import styles from "./NotAuthorised.module.css";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["notauth-container"]}>
      <div className={styles["notauth-card"]}>
        <h1 className={styles["error-code"]}>403</h1>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>

        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </div>
  );
};

export default NotAuthorized;
