import React from 'react'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}


const SectionButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`p-2 w-fit text-[var(--secondary--color-2)] rounded-lg bg-[var(--secondary--color-3)]`}
        >
            {children}
        </button>
    )
}

export default SectionButton