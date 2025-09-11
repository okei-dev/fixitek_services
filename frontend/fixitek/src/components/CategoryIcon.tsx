import { serviceIcons } from '@/lib/serviceIcons';
import React from 'react'


interface CategoryIconProps {
    id: number;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ id }) => {
    const icon = serviceIcons.find(icon => icon.id === id);

    if (!icon) return null;

    return <img src={icon.icon} alt={`icon-${id}`} className='size-10 max-auto' />
}

export default CategoryIcon