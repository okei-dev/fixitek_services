import SectionButton from '@/components/SectionButton'
import React from 'react'
import { SlEmotsmile, SlEnergy, SlLocationPin, SlWrench } from 'react-icons/sl'



const WhyUs = () => {

    const services = [
        {
            icon: './img/flash.png',
            subhead: 'Fast & Reliable',
            desc: 'We respond quickly and get the job done right—on time, every time.'
        },
        {
            icon: './img/tools.png',
            subhead: 'Expert Team',
            desc: 'Our in-house professionals bring years of hands-on experience to deliver top-quality services.'
        },
        {
            icon: './img/smile.png',
            subhead: 'Customer-First Approach',
            desc: 'Your satisfaction is our priority, and we go the extra mile to exceed expectations.'
        }
    ]
    return (
        <section className='mt-30 mx-4'>
            <SectionButton>Why Us?</SectionButton>
            <h2 className="p-2 text-2xl text-[var(--neutral--800)] border-b-2 border-[var(--neutral--300)] ">We're a professional team offering the best services</h2>
            <ul>
                {services.map((service, index) => (
                    <li key={index}>
                        <div className="mt-2 pb-2 flex border-b-2 border-[var(--neutral--300)]">
                            <img
                                src={service.icon}
                                className="mr-4 size-8 pb-2 border-b-2 border-[var(--accent--primary-1)]"
                            />
                            <div className="flex-block">
                                <h2 className="text-lg text-[var(--neutral--800)]">{service.subhead}</h2>
                                <p className="text-base py-4">{service.desc}</p>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>
        </section>
    )
}

export default WhyUs