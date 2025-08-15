import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`
        border 
        border-[var(--accent--primary-1) 
        bg-[var(--accent--primary-1) 
        text-[var(--neutral--800)] 
        text-center 
        transform-style-preserve-3d 
        rounded-[12px] 
        px-[38px] 
        py-[26px] 
        font-bold 
        leading-[1.111em] 
        no-underline 
        transition 
        duration-300 
        ease-in-out 
        border-color 
        bg-color 
        transform 
        color
        ${props.className ?? ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
