import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'

const Layout = () => {
  return (
    <div className='min-h-screen'>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout