import { reviews } from '@/lib/reviews';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import SectionButton from './SectionButton';
import { Link } from 'react-router-dom';

const Testimonial = () => {
    const [index, setIndex] = useState(0);

    const nextReview = () => {
        setIndex(prev => (prev + 1) % reviews.length);
    }

    const prevReview = () => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }

    return (
        <div className='mt-20 mx-4'>
            <SectionButton>Testimonial</SectionButton>
            <h2 className='text-2xl text-[var(--neutral--800)]'>What People say about our services</h2>
            <p className='mt-4 p-2 leading-relaxed font-extralight text-[var(--neutral--700)]'>
                At Fixitek, every repair is more than just a job — it’s a chance to make life easier for our customers. From urgent fixes to routine maintenance, people trust us to show up, get it done right, and bring peace of mind.

                These stories reflect what we stand for: reliability, professionalism, and care. We’re proud of the relationships we’ve built, and invite you to hear from the customers who make Fixitek their go-to repair partner.
            </p>
            <div className='mt-12'>
                <div className='p-6 review rounded-3xl bg-[var(--secondary--color-3)]'>
                    <AnimatePresence mode='wait'>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <p className='text-xl text-[var(--neutral--800)] leading-relaxed'>"{reviews[index].text}"</p>

                        <div className='mt-12 flex items-center'>
                            <img
                                src={reviews[index].photo}
                                alt={reviews[index].name}
                                className='w-20 h-20 rounded-full'
                            />
                            <div className='mx-4'>
                                <h3 className='mt-6 font-semibold text-[var(--neutral--800)] text-lg'>{reviews[index].name}</h3>
                                <p>{reviews[index].location}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                </div>

                <div className='flex justify-center mt-4 gap-2'>
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full ${i === index ? 'bg-[var(--neutral--800)]'
                                    : 'bg-[var(--neutral--500)]'
                                }`}
                        />
                    ))}
                </div>

                <div className='mt-8 flex items-center justify-center space-x-12'>
                    <button
                        onClick={prevReview}
                        className='p-6 border-1 border-[var(--neutral--800)] rounded-full'
                    >
                        <GoArrowLeft size={20}/>
                    </button>

                    <button
                        onClick={nextReview}
                        className='p-6 border-1 border-[var(--neutral--700)] rounded-full'
                    >
                        <GoArrowRight size={20}/>
                    </button>
                </div>
            </div>
            <Link to='/services' 
                className='mt-10 btn-primary'
                >Get a quote <GoArrowRight /> 
                </Link>
        </div>
    )
}

export default Testimonial