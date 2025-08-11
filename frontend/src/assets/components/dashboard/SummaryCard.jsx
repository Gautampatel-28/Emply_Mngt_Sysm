import "../../styles/summaryCard.css";

const SummaryCard = ({ icon, text, number,color }) => {
  return (
    <>
      <div className="summary-card">
        <div className="summary-icon" style={{ backgroundColor: color }}> 
          {icon}
        </div>
        <div className="summary-content">
          <p className="summary-text">{text}</p>
          <p className="summary-number">{number}</p>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
