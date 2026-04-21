import './ValueCard.css';

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="value-card">
      <div className="value-icon">{icon}</div>
      <h3 className="value-title">{title}</h3>
      <p className="value-description">{description}</p>
    </div>
  );
};

export default ValueCard;
