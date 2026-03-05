import React from "react";
import styles from "./SignUp.module.css";
import eyeIcon from "../../assets/eye.png";
import hidden from "../../assets/hidden.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Context/UserContextProvider";
import Loader from "../../Components/Loader/Loader";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = React.useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:1337/api/auth/local/register",
          {
            username: username,
            email: email,
            password: password,
          },
        );
        console.log("Well done!", response);
        if (response.statusText === "OK") {
          login(response.data);
          navigate("/");
          setIsLoading(false);
        }
      } catch (error) {
        console.log("An error occurred:", error.response);
        setIsLoading(false);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={onHandleSubmit}>
            <h2 className={styles.title}>Sign Up</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <button type="submit" className={styles.button}>
              Create User
            </button>
            <p className={styles.registerText}>
              Already have a account ? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
