import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./assets/pages/Login";
import AdminDashboard from "./assets/pages/AdminDashboard";
import EmployeeDashboard from "./assets/pages/EmployeeDashboard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
