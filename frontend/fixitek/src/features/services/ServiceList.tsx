import React from 'react'
import { useService } from '@/hooks/useService'
import ErrorDisplay from '@/components/ErrorDisplay';
import CategoryIcon from '@/components/CategoryIcon';
import ServiceCard from './ServiceCard';
import { useParams } from 'react-router-dom';
import { ServiceImage } from '@/components/ServiceImage';


const ServiceList: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const { services, loading, error } = useService(Number(categoryId));

    const category = services?.[0]?.category
    console.log('services: ', services)

    if (loading) return <p className='text-3xl text-center mt-8'>Loading...</p>
    if (error) return <ErrorDisplay message={error} />

  return (
    <div className="mt-10 mx-4 flex flex-col items-center">
        <div className='relative mt-2 mb-12'>
            <ServiceImage
                src={category?.photo_url}
                alt={category?.name || 'Category'}
            />

            <div className='absolute inset-0 bg-[var(--neutral--800)]/60 z-10 rounded-xl flex items-center'>
                <div className='p-4 text-[var(--neutral--100)]'>
                    <h2 className='text-2xl font-semibold'>{category?.name}</h2>
                    <p className=''>{category?.description}</p>
                </div>
            </div>

            {category?.id && (
                <div className="absolute -bottom-10 left-35 rounded-full border-3 border-white p-4 bg-[var(--accent--primary-1)] z-20">
                <CategoryIcon id={category?.id} />
            </div>
            )}
        </div>

        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
            {services.map((service) => {
                return (<ServiceCard
                    key={service.id}
                    service={service}
                    />
                    );
                })}

        </ul>

    </div>
  )
}

export default ServiceList