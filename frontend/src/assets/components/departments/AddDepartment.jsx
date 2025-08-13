
import { useState } from "react";
import "../../styles/addDepartment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;  
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
       const response = await axios.post('http://localhost:5000/api/department/add', department, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
       })
       if(response.data.success){
            navigate("/admin-dashboard/departments")
       }
    } catch (error) {
        console.log(error)
        if(error.response && !error.response.data.error){
            alert(error.response.data.error)
        }
    }
  };

  return (
    <>
      <div className="add-department-container">
        <h3>Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dep_name">Department Name</label>
            <input
              type="text"
              name="dep_name"
              id="dep_name"
              onChange={handleChange}
              placeholder="Add Dept Name..."
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
          </div>
          <button type="submit">Add Department</button>
        </form>
      </div>
    </>
  );
};

export default AddDepartment;
