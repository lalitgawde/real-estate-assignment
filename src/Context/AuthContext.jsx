import { createContext, useState } from "react";
// import { users } from "../data/user";
// import { buyersList } from "../data/buyers";
// import { sellers } from "../data/sellers";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  toggleSaveProperty: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : null;
  });

  const login = (user) => {
    setUser(user);
    localStorage.setItem("userLogin", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userLogin");
    navigate("/logout");
  };

  const toggleSaveProperty = (propertyId) => {
    if (!user) return;

    const isSaved = user.savedProperties.includes(propertyId);

    setUser({
      ...user,
      savedProperties: isSaved
        ? user.savedProperties.filter((id) => id !== propertyId)
        : [...user.savedProperties, propertyId],
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleSaveProperty }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
