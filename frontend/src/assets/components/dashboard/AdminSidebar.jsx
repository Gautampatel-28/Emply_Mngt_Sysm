import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import "../../styles/adminsidebar.css";

const AdminSidebar = () => {
  return (
    <>
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3 className="admin-sidebar-title">Employee MS</h3>
        </div>
        <div className="admin-sidebar-links">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${isActive ? "active-link" : ""} sidebar-link`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin-dashboard" className="sidebar-link">
            <FaUsers />
            <span>Employee</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? "active-link" : ""} sidebar-link`
            }
          >
            <FaBuilding />
            <span>Department</span>
          </NavLink>
          <NavLink to="/admin-dashboard" className="sidebar-link">
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>
          <NavLink to="/admin-dashboard" className="sidebar-link">
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
          <NavLink to="/admin-dashboard" className="sidebar-link">
            <FaCogs />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
