import { Routes, Route } from "react-router-dom";

// import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import UserDashboard from "../pages/user/UserDashboard";
import Login from "../pages/auth/Login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} /> */}
    </Routes>
  );
};
export default AppRoutes;
