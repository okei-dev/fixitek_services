import React, { useEffect, useState } from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import ServiceCategories from '@/features/services/ServiceCategories'
import About from './about/About'
import Testimonial from '@/components/Testimonial'
import QuoteCard from '@/components/QuoteCard'



const Home = () => {

  return (
    <main>
      <section className="mt-10 bg-[var(--secondary--color-3)]">
        <h1 className="text-3xl p-4 text-center text-[var(--neutral--800)]">Fixitek Services</h1>
        <div>
          <p className="text-base p-4 text-center font-light leading-relaxed mb-10">
            we specialize in fast, reliable, and high-quality handyman services.
            From assembling your new furniture to installing complex home systems, our skilled
            technicians handle it all with care and precision.
          </p>
          <div className="flex flex-col mx-4">
            <Link
              to="/about"
              className="btn-primary-small inline-flex items-center gap-2 justify-center">
              <p>Get a Quote</p>
              <GoArrowRight />
            </Link>
            <Link
              to="/services"
              className="btn-secondary-small inline-flex items-center gap-2 justify-center mt-4">
              <p>Browser our Services </p>
              <GoArrowRight />
            </Link>
          </div>
          <div className="relative mt-8 mx-4 staff-line-svg">
                <img src="/img/fixitek_handyman.png" alt="Fixitek staff" />
            </div>
          <QuoteCard>
            <div></div>
          </QuoteCard>
        </div>
      </section>


      {/*About us */}
      <About />

      <div className="mx-4">

        <Link
          to="/about"
          className="mt-6 inline-flex btn-primary-small justify-center items-center gap-2 w-full"
        >
          <p>Get a quote</p>
          <GoArrowRight />
        </Link>
        <img
          src="/img/furniture.jpg"
          alt="fixitek handyman"
          className="mt-6 object-contain object-center"
        />
      </div>

      <ServiceCategories />

      <Testimonial />

    </main>
  )
}

export default Home
