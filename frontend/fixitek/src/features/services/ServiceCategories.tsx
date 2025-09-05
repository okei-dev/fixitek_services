import React, { useEffect, useState } from 'react'
import { getServiceCategories } from './serviceApi'
import { ServiceCategory } from '@/types/service';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import SectionButton from '@/components/SectionButton';

const ServiceCategories = () => {
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getCategoryList = async () => {
            setLoading(true)
            try {
                const data = await getServiceCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);

            } finally {
                setLoading(false)
            }
        };

        getCategoryList();
    }, [])

    if (loading) return <p>Loading categories...</p>


    return (
        <div className='mt-20 mx-4'>
            <SectionButton>Our Services</SectionButton>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id} className='my-4 p-4 border rounded-3xl'>
                        <div>
                            {cat.photo_url ? (
                                <img src={cat.photo_url} alt={cat.name} />
                            ) : (
                                <img src='./img/furniture.jpg' alt='furniture' />
                            )}
                        </div>
                        <h3 className='font-bold'>{cat.name}</h3>
                        <p className='p-2 text-base'>{cat.description}</p>
                        <Link
                            to={`/categories/${cat.id}/services/`}
                            className='flex justify-center items-center gap-2 text-[var(--neutral--800)] p-2'
                        >
                            view Services
                            <GoArrowRight />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceCategories