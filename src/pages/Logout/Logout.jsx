import React from "react";
import styles from "./Logout.module.css";
import LogOutIcon from "../../images/logout.png"; // adjust path if needed
import { Link, useLocation } from "react-router-dom";

function Logout() {
  const location = useLocation();
  console.log(location.pathname === "/logout" ? "/login" : "/admin/login");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={LogOutIcon} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>You are Logged Out</h1>
        <p className={styles.text}>You have been successfully logged out.</p>
        {location.pathname === "/logout" && (
          <p className={styles.text}>Thanks for visiting our site.</p>
        )}
        {/* <div className={styles.buttonWrapper}>
          <button className={styles.button}>
            <Link
              to={location.pathname === "/logout" ? "/login" : "/admin/login"}
              style={{ textDecoration: "none", color: "white" }}>
              Log In
            </Link>
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Logout;
