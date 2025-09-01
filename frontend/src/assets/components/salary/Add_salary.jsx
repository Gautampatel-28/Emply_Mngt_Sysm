import "../../styles/addSalary.css";
import { useState, useEffect } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Add_salary = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowance: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          //   `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSalary({
            employeeId: "",
            department: "",
            basicSalary: "",
            allowances: "",
            deductions: "",
            payDate: "",
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          showError("Error in Forms !");
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Submit API Response:", response.data);
      if (response.data.success) {
        showSuccess("Data Form Updated !");
        setTimeout(() => {
          navigate("/admin-dashboard/employees");
        }, 2000);
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
      {departments && employees ? (
        <div className="add-salary-container">
          <h2 className="form-Title-salary">Add Salary ₹</h2>
          <form onSubmit={handleSubmit}>
            <div className="formgridSalary">
              <div className="formgroupSalary">
                <label>Department</label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  value={salary.department}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* employee  */}
              <div className="formgroup">
                <label>Employee</label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  value={salary.employeeId || ""}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formgroup">
                <label>Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="₹ Basic Salary"
                  required
                />
              </div>

              <div className="formgroup">
                <label>Allowances</label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="₹ allowances"
                  required
                />
              </div>

              <div className="formgroup">
                <label>Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="₹ deductions"
                  required
                />
              </div>

              <div className="formgroup">
                <label>Pay Date</label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn-salary">
              Add Salary
            </button>
          </form>
          <ToastContainer />
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
};

export default Add_salary;
