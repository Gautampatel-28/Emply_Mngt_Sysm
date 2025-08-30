import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/view.css";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const found = response.data.employees.find((emp) => emp._id === id);
          setEmployee(found);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      <div className="view-container">
        <h2 className="view-title">Employee Details</h2>
        <div className="view-grid">
          <div>
            <img
              src={`http://localhost:5000${employee.userId?.profileImage}`}
              alt="Employee"
              className="view-avatar"
            />
          </div>

          <div>
            <div className="view-row">
              <p className="view-label">Name:</p>
              <p className="view-value">{employee.userId?.name}</p>
            </div>

            <div className="view-row">
              <p className="view-label">Employee ID:</p>
              <p className="view-value">{employee.employeeId}</p>
            </div>

            <div className="view-row">
              <p className="view-label">Date of Birth:</p>
              <p className="view-value">
                {employee.dob
                  ? new Date(employee.dob).toLocaleDateString()
                  : ""}
              </p>
            </div>

            <div className="view-row">
              <p className="view-label">Gender:</p>
              <p className="view-value">{employee.gender}</p>
            </div>

            <div className="view-row">
              <p className="view-label">Department:</p>
              <p className="view-value">{employee.department?.dep_name}</p>
            </div>

            <div className="view-row">
              <p className="view-label">Marital Status:</p>
              <p className="view-value">{employee.martialStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
