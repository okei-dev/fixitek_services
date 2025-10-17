import React from 'react'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}


const SectionButton: React.FC<Props> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`mb-4 p-2 w-fit text-[var(--neutral--100)] bg-[var(--secondary--color-2)] rounded-lg`}
        >
            {children}
        </button>
    )
}

export default SectionButton