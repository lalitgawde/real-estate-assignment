import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import styles from "./Navbar.module.css";
import NotificationBell from "../NotificationBell/NotificationBell";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles["navbar"]}>
      <Link
        to={user?.role === "buyer" ? "/" : null}
        className={styles["logo"]}
        styles={{ textDecoration: "none" }}>
        RealEstate
      </Link>
      <div>
        {user ? (
          <div className={styles.navbarActions}>
            <span className={styles["welcome"]}>Hi, {user.name}</span>
            {user.role !== "admin" && <NotificationBell />}
            <button onClick={logout} className={styles["btn"]}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles["btn"]}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
