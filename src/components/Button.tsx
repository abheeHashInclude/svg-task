import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'blue' | 'red';
  size?: 'large' | 'medium' | 'small';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'blue', size = 'large', type = 'button' }) => {
  return (
    <button
      className={`custom-btn ${color} ${size}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button; 