import React from 'react'

const StatCard = ({ title, value}: { title: string; value: number }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <p className='text-4xl font-bold'>{value}</p>
    </div>
  )
}

export default StatCard