import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="navbar">
        <p className="navbar-welcome">Welcome, {user.name}</p>
        <button className="navbar-logout" onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Navbar;
