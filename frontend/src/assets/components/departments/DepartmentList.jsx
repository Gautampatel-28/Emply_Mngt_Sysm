import { Link } from "react-router-dom";
import "../../styles/departmentList.css";
import DataTable from "react-data-table-component";
import { column, DepartmentButton } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButton Id={dep._id} />,
          }));
          setDepartments(data);
        }

        console.log(response.data);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      {depLoading ? (
        <div>Loading... </div>
      ) : (
        <div className="department-list-container">
          <div className="department-list-header">
            <h3>Manage Department</h3>
          </div>

          <div className="department-list-actions">
            <input type="text" placeholder="Search by department name" />
            <Link to="/admin-dashboard/add-department" className="add-btn">
              Add New Department
            </Link>
          </div>

          <div className="deprt-dataTable">
            <DataTable columns={column} data={departments} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
