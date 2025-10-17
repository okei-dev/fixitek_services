import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        `
          inline-flex items-center justify-center
          border border-[var(--accent--primary-1)]
          bg-[var(--accent--primary-1)]
          text-[var(--neutral--800)]
          text-center
          transform-style-preserve-3d
          rounded-[12px]
          px-[38px] py-[26px]
          text-[18px] font-bold leading-[1.111em]
          no-underline
          transition-[border-color,background-color,transform,color]
          duration-300 ease-in-out
          hover:scale-[1.03]
          hover:bg-[var(--secondary--color-1)]
          hover:text-[var(--neutral--100)]
          active:scale-95
        `,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
