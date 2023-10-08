import React from 'react';

interface ButtonProps {
    label: string,
    onClick?: any,
    url: string
}


const Button: React.FC<ButtonProps> = ({ label, onClick, url }) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className="primary-button">
      {label}
    </button>
  );
};

export default Button;