import "../../styles/viewSalary.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const View_salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setfilteredSalaries] = useState([]);
  const { id } = useParams();
  // let sno = 1;

const fetchSalaries = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response.data);

    if (response.data.success) {
      setSalaries(response.data.salary);
      setfilteredSalaries(response.data.salary);
      // showSuccess("View Salary !");
    }
  } catch (error) {
    if (error.response) {
      showError(error.response.data.message || "Error in Salary View !");
    } else {
      showError("Network Error");
    }
  }
};


  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    if (!q) {
      setfilteredSalaries(salaries);
      return;
    }
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setfilteredSalaries(filteredRecords);
  };

  // Success toast
  // const showSuccess = (message) => {
  //   toast.success(message, {
  //     theme: "dark",
  //     style: { backgroundColor: "#000", color: "#fff" },
  //     autoClose: 1500,
  //   });
  // };

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
      {filteredSalaries === null ? (
        <div>Loading ....</div>
      ) : (
        <div className="salary-container">
          <div className="salary-title">
            <div className="salary-heading">Salary History</div>
          </div>
          <div className="salary-search">
            <input
              type="text"
              placeholder="Search by Emp ID"
              className="salary-search-input"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {setfilteredSalaries.length > 0 ? (
            <table className="salary-table">
              <thead className="salary-thead">
                <tr>
                  <th className="salary-th">SNO</th>
                  <th className="salary-th">Emp ID</th>
                  <th className="salary-th">Salary</th>
                  <th className="salary-th">Allowance</th>
                  <th className="salary-th">Deduction</th>
                  <th className="salary-th">Total</th>
                  <th className="salary-th">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, i) => (
                  <tr key={salary.id} className="salary-tr">
                    <td className="salary-td">{i + 1}</td>
                    <td className="salary-td">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="salary-td">{salary.basicSalary}</td>
                    <td className="salary-td">{salary.allowances}</td>
                    <td className="salary-td">{salary.deductions}</td>
                    <td className="salary-td">
                      {salary.basicSalary +
                        salary.allowances -
                        salary.deductions}
                    </td>
                    <td className="salary-td">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No records founds.....</div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default View_salary;
