import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowRight } from 'react-icons/go'


interface Props {
    title?: string;
    highlight?: string;
    ctaText?: string;
    ctaUrl?: string;
    children?: React.ReactNode;
    bgClass?: string;
    textColor?: string;
}


const QuoteCard: React.FC<Props> = ({
    title = "Contact our expert handyman today!",
    highlight,
    bgClass = "bg-[var(--secondary--color-1)]",
    textColor = "text-[var(--neutral--100)]",
    children
}) => {
    return (
        <div className={`flex flex-col px-6 py-4 rounded-2xl ${bgClass} bg-[url('./img/spiral-blue-line.svg')] bg-cover bg-center`}>
            <h2 className={`mt-4 p-2 text-3xl ${textColor}`}>
                {title }{" "}
                <span className='text-[var(--accent--primary-1)]'>{highlight}</span>
            </h2>
            
            {children}
        </div>
    )
}

export default QuoteCard