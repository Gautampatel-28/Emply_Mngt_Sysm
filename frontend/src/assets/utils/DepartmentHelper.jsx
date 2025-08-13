import { useNavigate } from "react-router-dom";
import "../styles/departmentHelper.css";

export const column = [
  {
    name: "Sr no",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButton = ({ Id }) => {
  const navigate = useNavigate();
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
        <button type="button" className="btn-delete">
          Delete
        </button>
      </div>
    </>
  );
};
