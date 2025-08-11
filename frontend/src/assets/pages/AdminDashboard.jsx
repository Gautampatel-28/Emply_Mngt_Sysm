import "../styles/adminDashboard.css";
// import { useAuth } from "../context/AuthContext";
import Navbar from "../components/dashboard/Navbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";
// import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  // const { user } = useAuth();
  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />
        <div className="admin-dashboard-content">
          <Navbar />
          {/* <AdminSummary /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
