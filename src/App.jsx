import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import AdminPanel from "./pages/Admin/AdminPanel";
import BuyerDashBoard from "./pages/BuyerDashBoard/BuyerDashBoard";
import Logout from "./pages/Logout/Logout";
import SellerDashboard from "./pages/SellerDashBoard/SellerDashBoard";
import ProtectedRoute from "./Protected";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
