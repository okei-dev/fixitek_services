import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="flow-root mt-30 bg-[var(--secondary--color-3)]">
      <main className="">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to Fixitex Services
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Your one-stop solution for booking professional repair and maintenance services.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>
      </main>
    </section>
  )
}

export default Home
