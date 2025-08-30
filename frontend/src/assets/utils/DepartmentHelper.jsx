import { useNavigate } from "react-router-dom";
import "../styles/departmentHelper.css";
import axios from "axios";

export const DepartmentButton = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          // setDepartment(response.data.department);
          onDepartmentDelete(id);
        }

        console.log(response.data);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <>
      <div className="department-btn-group">
        <button
          type="button"
          className="btn-edit"
          onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => handleDelete(Id)}
        >
          Delete
        </button>
      </div>
    </>
  );
};


  // eslint-disable-next-line react-refresh/only-export-components
export const column = [
  {
    name: "S no",
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];


