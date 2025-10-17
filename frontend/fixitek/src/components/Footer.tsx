import React from 'react'
import { menuData } from './Header/menuData'
import { Link } from 'react-router-dom'
import CartItem from '@/features/cart/CartItem'
import QuoteCard from './QuoteCard'
import HandymanCard from './HandymanCard'
import Button from './Buttons/Button'

const Footer = () => {
  return (
    <div className='relative mt-40 pt-70 flex flex-col text-[var(--neutral--100)] bg-[var(--secondary--color-1)]'>

      <div className='absolute -top-20'>
        <HandymanCard
        >
          <Button
            className='bg-none border-[var(--neutral--800)]'
          >More about us</Button>
        </HandymanCard>
      </div>

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
          src='/img/logo.png'
          alt='Fixitek logo'
          className='w-32'
        />
        <p>Copyright &copy; Fixitek | All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer