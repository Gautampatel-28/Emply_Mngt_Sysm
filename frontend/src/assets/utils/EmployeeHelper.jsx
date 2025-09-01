import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const column = [
  {
    name: "S no",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const fetchDepartments = async () => {
  let departments = [];
  try {
    const response = await axios.get(`http://localhost:5000/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }

    console.log("Fetched Departments:", response.data);
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};

// employee for salary form 
export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    }

    console.log("Fetched employees-department:", response.data);
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return employees;
};


export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="department-btn-group">
        <button
          type="button"
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
        >
          View
        </button>

        <button
          type="button"
          style={{
            backgroundColor: "#2196F3",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
        >
          Edit
        </button>

        <button
          type="button"
          style={{
            backgroundColor: "#FF9800",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
        >
          Salary
        </button>

        <button
          type="button"
          style={{
            backgroundColor: "#F44336",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Leave
        </button>
      </div>
    </>
  );
};
