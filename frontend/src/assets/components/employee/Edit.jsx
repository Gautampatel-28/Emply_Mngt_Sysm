import "../../styles/addEmplEdit.css";
import { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    martialStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  // const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  // const navigate = useNavigate();
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
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // if (response.data.success) {
        //   setEmployee(response.data.employees || {});
        // }
        if (response.data.success) {
          const emp = response.data.employees;
          setEmployee({
            name: emp.userId?.name || "",
            martialStatus: emp.martialStatus || "",
            designation: emp.designation || "",
            salary: emp.salary || 0,
            department: emp.department?._id || "",
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
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formDataObj = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataObj.append(key, formData[key]);
    // });
    // console.log("📤 Submitting Form Data:", [...formDataObj]);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Submit API Response:", response.data);
      if (response.data.success) {
        showSuccess("Data Form Updated !");
        // navigate("/admin-dashboard/employees");
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
      {departments && employee ? (
        <div className="edit-employee-container">
          <h2 className="form-Title">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="formgrid">
              <div className="formgroup">
                <label>Name</label>
                {/* <input
                  type="text"
                  name="name"
                  placeholder="Insert Name"
                  onChange={handleChange}
                  value={employee.userId?.name || ""}
                  required
                /> */}
                <input
                  type="text"
                  name="name"
                  placeholder="Insert Name"
                  onChange={handleChange}
                  value={employee.name}
                  required
                />
              </div>

              <div className="formgroup">
                <label>Marital Status</label>
                <select
                  name="martialStatus"
                  onChange={handleChange}
                  value={employee.martialStatus || ""}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              <div className="formgroup">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={employee.designation || ""}
                  onChange={handleChange}
                  placeholder="Designation"
                  required
                />
              </div>

              <div className="formgroup">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary || ""}
                  placeholder="Salary"
                  required
                />
              </div>

              <div className="formgroup">
                <label>Department</label>
                <select
                  name="department"
                  onChange={handleChange}
                  // value={employee.department?._id || ""}
                  value={employee.department}
                  required
                >
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
            </div>

            <button type="submit" className="submit-btn">
              Update Employee
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

export default Edit;
