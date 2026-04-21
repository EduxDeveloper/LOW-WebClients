import './Buttons.css';

export const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button className={`btn btn-primary ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button className={`btn btn-secondary ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const OutlineButton = ({ children, onClick, className = '' }) => {
  return (
    <button className={`btn btn-outline ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
