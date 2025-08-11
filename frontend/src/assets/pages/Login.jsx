import { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Success toast
  const showSuccess = (message) => {
    toast.success(message, {
      theme: "dark",
      style: { backgroundColor: "#000", color: "#fff" },
      autoClose: 1500,
    });
  };

  // Error toast
  const showError = (message) => {
    toast.error(message, {
      theme: "dark",
      style: { backgroundColor: "#000", color: "#fff" },
      autoClose: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
        showSuccess("Successfully logged in!");
        setError("");
        console.log(response);
      } else {
        showError(response.data.message || "Invalid credentials");
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Server Error!";
      setError(errMsg);
      showError(errMsg);
      console.error(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2 className="login-title">Employee Management System</h2>

        <div className="login-box">
          <h2 className="login-heading">Login</h2>
          {error && <p className="error-name">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
