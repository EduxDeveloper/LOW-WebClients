import './InfoBlock.css';

const InfoBlock = ({ title, description, variant = 'light' }) => {
  // variant can be 'light' or 'dark'
  const isDark = variant === 'dark';
  
  return (
    <div className={`info-block ${isDark ? 'info-dark' : 'info-light'}`}>
      <h3 className="info-block-title">{title}</h3>
      <p className="info-block-description">{description}</p>
    </div>
  );
};

export default InfoBlock;
