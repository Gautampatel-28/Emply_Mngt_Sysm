import {
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import "../../styles/adminSummary.css";

const AdminSummary = () => {
  return (
    <>
      <div className="custom-container">
        <h3 className="custom-title">Dashboard Overview</h3>
        <div className="custom-grid">
          <SummaryCard
            icon={<FaUsers />}
            text="Total Employees"
            number={13}
            color="#cb751fff"
          />
          <SummaryCard
            icon={<FaBuilding />}
            text="Total Departments"
            number={5}
            color="#c2c71aff"
          />
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text="Monthly Salary"
            number="₹654"
            color="#ee0f0fff"
          />
        </div>

        <div className="leave-details-section">
          <h4 className="leave-details-title">Leave Details</h4>
          <div className="leave-details-grid">
            <SummaryCard
              icon={<FaFileAlt />}
              text="Leave Applied"
              number={5}
              color="#c81ce6ff"
            />
            <SummaryCard
              icon={<FaCheckCircle />}
              text="Leave Approved"
              number={2}
              color="#29b319ff"
            />
            <SummaryCard
              icon={<FaHourglassHalf />}
              text="Leave Pending"
              number={4}
              color="#1437aaff"
            />
            <SummaryCard
              icon={<FaTimesCircle />}
              text="Leave Rejected"
              number={1}
              color="#f40b0bff"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSummary;
