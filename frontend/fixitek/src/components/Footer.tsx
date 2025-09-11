import React from 'react'
import { menuData } from './Header/menuData'
import { Link } from 'react-router-dom'
import CartItem from '@/features/cart/CartItem'
import QuoteCard from './QuoteCard'

const Footer = () => {
  return (
    <div className='relative mt-40 pt-70 flex flex-col text-[var(--neutral--100)] bg-[var(--secondary--color-1)]'>
      <QuoteCard>
        <Link
          to='/about'
          className='mt-8 btn-secondary-small text-center'
        >
          More about us
        </Link>
      </QuoteCard>
      <h2 className='p-4 text-2xl font-semibold'>Menu</h2>
      {menuData.map((menu, idx) => (
        menu.subMenu ? menu.subMenu.map((sub, subIdx) => (
          <Link
            key={subIdx}
            to={sub.url}
            className='p-4 text-sm'
          >
            {sub.name}
          </Link>
        )) : (
          <Link
            key={idx}
            to={menu.url}
            className='p-4 text-sm'
          >
            {menu.name}
          </Link>
        )
      ))}
      <div>
        <div className='p-4 text-[var(--neutral--100)]'>
          <p className='text-sm'>Phone</p>
          <p className='font-semibold'>(+1) 240 640-3500</p>
        </div>

        <div className='p-4 text-[var(--neutral--100)]'>
          <p className='text-sm'>Email</p>
          <p className='font-semibold'>contact@fixitek.com</p>
        </div>
      </div>
      <div className='px-4'>
        <img
          src='./logo.png'
          alt='Fixitek logo'
          className='w-32'
          />
          <p>Copyright &copy; Fixitek | All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer