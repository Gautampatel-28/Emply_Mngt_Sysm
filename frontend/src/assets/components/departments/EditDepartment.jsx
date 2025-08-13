import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/editDepartment.css";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="edit-department-container">
          <h3>Edit Department</h3>
          <form onSubmit={handleSubmit}>
            <div className="edit-department-field">
              <label htmlFor="dep_name">Department Name</label>
              <input
                type="text"
                name="dep_name"
                id="dep_name"
                onChange={handleChange}
                value={department.dep_name}
                placeholder="Add Dept Name..."
              />
            </div>

            <div className="edit-department-field">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                onChange={handleChange}
                value={department.description}
                placeholder="Description"
              ></textarea>
            </div>

            <button className="edit-department-btn" type="submit">
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
