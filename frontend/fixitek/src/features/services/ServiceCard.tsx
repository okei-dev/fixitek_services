import React from 'react'
import { useCart } from '../cart/cartContext'


type Service = {
    id: number
    name: string
}

const ServiceCard = ({ service }: { service: Service}) => {
    const { addItem } = useCart();

    const handleAdd = () => {
        addItem({ service_id: service.id, quantity: 1})
    }

    
  return (
    <div>
        <h3 className='text-lg font-semibold'>{service.name}</h3>
        <button
        onClick={handleAdd}
        className='mt-2 px-4 py-1 bg-blue-600 text-white rounded'
        >
            Add to Cart
        </button>
    </div>
  )
}

export default ServiceCard