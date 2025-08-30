import "../../styles/addEmpl.css";
import { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/employee/add`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        showSuccess("Data Form Added !");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.error) {
        showError("Error in Forms !");
      }
    }
  };

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

  return (
    <>
      <div className="add-employee-container">
        <h2 className="form-title">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Insert Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Insert Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                placeholder="DOB"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marital Status</label>
              <select name="martialStatus" onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((dep) => {
                  return (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="******"
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Employee
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Add;
