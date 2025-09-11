import React, { useEffect, useState } from 'react'
import { getServiceCategories } from './serviceApi'
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import SectionButton from '@/components/SectionButton';
import { Category } from '@/types/category';
import CategoryIcon from '@/components/CategoryIcon';
import Button from '@/components/Button';

const ServiceCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
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
        <div className='mt-20 mx-4 flex flex-col items-center'>
            <SectionButton>Our Services</SectionButton>
            <h2 className='text-2xl text-center text-[var(--neutral--800)]'>Explore our wide range of services</h2>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id} className='m-4 text-center bg-[var(--neutral--100)] shadow-lg rounded-3xl overflow-hidden'>
                        <div className='relative flex justify-center'>
                            {cat.photo_url ? (
                                <img src={cat.photo_url} alt={cat.name} className='w-full aspect-[4/3] object-cover' />
                            ) : (
                                <img src='./img/furniture.jpg' alt='furniture' className='w-full aspect-[4/3] object-cover' />
                            )}
                            <div className='absolute -bottom-5 rounded-full border-3 border-white p-4 bg-[var(--accent--primary-1)]'>
                                <CategoryIcon id={cat.id} />
                            </div>
                        </div>
                        <div className='p-4'>
                            <h3 className='text-[var(--neutral--800)] hover:text-[var(--accent--primary-1)] font-bold'>{cat.name}</h3>
                            <p className='text-sm'>{cat.description}</p>
                            <Link
                                to={`/categories/${cat.id}/services/`}
                                className='flex justify-center items-center gap-2 text-sm text-[var(--secondary--color-2)] hover:text-[var(--accent--primary-1)] mt-2 p-3'
                            >
                                view Services
                                <GoArrowRight />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Button className='mt-10 flex gap-2 '>
                Our services
                <GoArrowRight />
            </Button>

            <div className='mt-30 flex flex-col p-4 rounded-2xl bg-[var(--secondary--color-1)] staff-line-svg'>
                <h2 className='mt-4 p-4 text-3xl text-[var(--neutral--100)]'>Get a budget today for your 
                    <span className='text-[var(--accent--primary-1)]'> new project</span>!</h2>
                    <button className='my-4 btn-primary'>
                        Get a quote
                        <GoArrowRight />
                    </button>
                    <div className='m-2 p-4 text-[var(--neutral--100)]'>
                        <p className='text-sm'>Call us</p>
                        <p className='font-semibold'>(+1) 240 640-3500</p>
                    </div>

                    <div className='m-2 p-4 text-[var(--neutral--100)]'>
                        <p className='text-sm'>Email us</p>
                        <p className='font-semibold'>contact@fixitek.com</p>
                    </div>
            </div>
        </div>
    )
}

export default ServiceCategories