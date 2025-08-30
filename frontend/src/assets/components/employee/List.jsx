import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/empl_list.css"
import { useState, useEffect } from "react";
import { column, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";


const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false); 
  const [filterEmployee, setFilterEmployees] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.userId.name,
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img src={`http://localhost:5000/api${emp.userId?.profileImage}`} />,
            // emp.userId.profileImage,
            action: (
              <EmployeeButtons Id={emp._id}/>
            ),
          }));
          setEmployees(data);
          setFilterEmployees(data)
        }

        console.log(response.data);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilterEmployees(records)
  }

  return (
    <>
      <div className="List-list-header">
        <h3>Manage Employees</h3>
      </div>

      <div className="List-list-actions">
        <input type="text" placeholder="Search by List name" onChange={handleFilter}/>
        <Link to="/admin-dashboard/add-employee" className="add-btn">
          Add New Employee
        </Link>
      </div>
      <div>
         <DataTable columns={column} data={filterEmployee} pagination />
      </div> 
    </>
  );
};

export default List;
