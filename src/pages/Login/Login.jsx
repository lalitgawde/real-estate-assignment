import React from "react";
import styles from "./Login.module.css";
import eyeIcon from "../../images/eye.png";
import hidden from "../../images/hidden.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Loader from "../../component/Loader/Loader";
import { users } from "../../data/user";
import { buyersList } from "../../data/buyers";
import { sellers } from "../../data/sellers";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Buyer");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showSellerCheckBox, setShowSellerCheckBox] = React.useState(false);
  const [sellerCheckbox, setSellerCheckbox] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (role === "admin") {
      const presentUser = users.filter(
        (user) => user.email === email && user.email.split("@")[0] === password,
      );
      if (presentUser.length > 0) {
        login(presentUser[0]);
        navigate("/admin");
      } else {
        alert("Invalid username or password");
      }
    } else if (role === "seller") {
      if (sellerCheckbox) {
        const presentUser = sellers.filter(
          (user) =>
            user.email === email && user.email.split("@")[0] === password,
        );
        if (presentUser.length > 0) {
          login(presentUser[0]);
          navigate("/seller-dashboard");
        } else {
          alert("Invalid username or password");
        }
      } else {
        alert("Pay for registration,then you can login as seller.");
      }
    } else {
      const presentUser = buyersList.filter(
        (user) => user.email === email && user.email.split("@")[0] === password,
      );
      if (presentUser.length > 0) {
        login(presentUser[0]);
        navigate("/");
      } else {
        alert("Invalid username or password");
      }
    }
    setIsLoading(false);
  };

  const onHandleSelect = (role) => {
    setRole(role);
    if (role === "seller") {
      setShowSellerCheckBox(true);
    } else {
      setShowSellerCheckBox(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={onHandleSubmit}>
            <h2 className={styles.title}>Login</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? hidden : eyeIcon}
                alt={showPassword ? "hide password" : "show password"}
                className={styles.eyeIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="role">User Role</label>
              <select
                value={role}
                onChange={(e) => onHandleSelect(e.target.value)}
                required>
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            {showSellerCheckBox && (
              <div className={styles["premium-toggle"]}>
                <input
                  type="checkbox"
                  name="isRegister"
                  checked={sellerCheckbox}
                  onChange={() => setSellerCheckbox((prev) => !prev)}
                />
                <label style={{ fontSize: "13px" }}>is Seller Register</label>
              </div>
            )}
            <button type="submit" className={styles.button}>
              Login
            </button>
            {/* <p className={styles.registerText}>
              Don't have an account ? <Link to="/signup">Register</Link>
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
