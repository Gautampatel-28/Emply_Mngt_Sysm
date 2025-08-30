import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
    console.log("User logged out successfully")
  };

  return (
    <>
      <div className="navbar">
        <p className="navbar-welcome">Welcome, {user.name}</p>
        <button className="navbar-logout" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Navbar;
