import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowRight } from 'react-icons/go'
import Button from './Buttons/Button';


interface Props {
    title?: string;
    ctaText?: string;
    ctaUrl?: string;
    className?: string;
    children?: React.ReactNode;
}


const HandymanCard: React.FC<Props> = ({
    title = "Contact our expert team today!",
    ctaText = "Get a quote",
    ctaUrl = "/about",
    children,
}) => {
    return (
        <div className="m-4 py-10 px-6 flex flex-col rounded-2xl bg-[var(--accent--primary-1)]">
            <h2 className="text-3xl text-center mb-4 px-3 text-[var(--neutral--800)]">{title}</h2>

            <Button
                className="mb-4 bg-[var(--neutral--800)] text-white"
            >
                <Link
                    to={ctaUrl}
                    className='flex space-x-2'
                >
                    <p>{ctaText}</p>
                    <GoArrowRight />
                </Link>
            </Button>
            {children}
        </div>
    )
}

export default HandymanCard