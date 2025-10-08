import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { SlEmotsmile, SlEnergy, SlLocationPin, SlWrench } from 'react-icons/sl'
import { VscComment } from 'react-icons/vsc'
import WhyUs from './WhyUs'
import Button from '@/components/Button'
import SectionButton from '@/components/SectionButton'



const About = () => {
    const contactUs = [
        {
            icon: './img/comment.png',
            subHead: 'Contact us',
            info: 'Email: contact@fixitek.com',
            extra: '(240) 640-3500'
        },
        {
            icon: './img/location.png',
            subHead: 'Our Location',
            info: '9505 Hobart Street Springdale, MD 20774',
            extra: ''
        }
    ]
    return (
        <section>
            <ul className="mt-50 mx-4 border-b-2 border-[var(--neutral--300)]">
                {contactUs.map((contact, index) => (
                    <li key={index}>
                        <div className="flex items-center gap-2">
                            <img
                                src={contact.icon}
                                alt={contact.subHead}
                                className="size-6" />
                            <h2 className="py-2 text-2xl text-[var(--neutral--800)]">{contact.subHead}</h2>
                        </div>
                        <div className="inline-flex flex-col">
                            <p className="py-2 text-base text-[var(--neutral--800)] hover:text-[var(--accent--primary-1)]">{contact.info}</p>
                            <p className="py-2 text-base text-[var(--neutral--800) hover:text-[var(--accent--primary-1)]]">{contact.extra}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-20 mx-4">
                <SectionButton>About</SectionButton>
                <h2 className="p-2 text-2xl text-[var(--neutral--800)] ">We've been working in the industry for 10 years</h2>
                <p className="text-base p-2 leading-relaxed">Fixitek Service is a platform that helps individuals and businesses
                    easily request, manage, and track essential services. Whether it’s home
                    repairs, technical support, or business solutions, Fixitek is built to
                    make service management simple and reliable.</p>
                <p className="text-base p-2 leading-relaxed">Our mission is to connect customers with trusted professionals while
                    providing a seamless digital experience. With features like user
                    authentication, service tracking, carts, and dashboards, we’re making it
                    easier for you to focus on what matters most while we handle the rest.</p>
                <Link
                    to="/about"
                    className="mt-6 inline-flex btn-secondary-small justify-center items-center gap-2 w-full"
                >
                    <p>About us</p>
                    <GoArrowRight />
                </Link>
                <img
                    src="/img/servicesbgfinal.jpg"
                    alt="fixitek handyman"
                    className="mt-6 object-contain object-center"
                />
            </div>
            <WhyUs />
        </section>
    )
}

export default About