import React from 'react'

const Spinner: React.FC<{ size?: 'sm' | 'md' }> = ({ size='mid'}) => {
    const spinnerSize = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  return (
    <div className={`animate-spin rounded-full border-2 border-t-transparent border-gray-500 ${spinnerSize}`} />
  )
}

export default Spinner