import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowRight } from 'react-icons/go'

interface HandymanCardProps {
    children: React.ReactNode;
}

const HandymanCard: React.FC<HandymanCardProps> = ({ children }) => {
    return (
        <div className="absolute mx-4 flex flex-col justify-center py-10 px-8 rounded-2xl bg-[var(--accent--primary-1)]">
            <h2 className="text-2xl text-center p-3 text-[var(--neutral--800)]">Contact our expert handyman today!</h2>
            <Link
                to="/about"
                className="btn-tertiary-small inline-flex justify-center items-center gap-2"
            >
                <p>Get a quote</p>
                <GoArrowRight />
            </Link>
            {children}
        </div>
    )
}

export default HandymanCard