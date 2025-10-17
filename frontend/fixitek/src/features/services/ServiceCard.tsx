import React from 'react'
import { Service } from '@/types/service';
import { ServiceImage } from '@/components/ServiceImage';
import Button from '@/components/Buttons/Button';
import { Link, useParams } from 'react-router-dom';


interface Props {
    service: Service;
}


const ServiceCard: React.FC<Props> = ({ service }) => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const { id, name, description, images } = service;

    const catId = Number(categoryId);

    return (
        <li className='px-4 bg-[var(--neutral--100)] shadow-lg rounded-3xl overflow-hidden'>

            <div>
                <h3 className='text-2xl text-[var(--neutral--800)] py-3 font-bold'>{name}</h3>
                <p> In Fixitek our <strong>{name}</strong> team, we have expert
                    specializing in <span className='italic'>{description}</span>.
                </p>
            </div>

            <div>
                <ServiceImage
                    src={images?.[0]?.image}
                    alt={name || 'Service'}
                    className='my-10'
                />
            </div>

            <div>
                <h3 className='text-xl text-[var(--neutral--800)] py-2 font-semibold'>Never get anything wrong again with our services</h3>
                <p>In our handyman team, we have expert in <strong>{name}</strong>
                    for repairs, assembly, installation and maintenance. We are
                    here to assist you.
                </p>
            </div>
            <div>
                <ServiceImage
                    src={images?.[1]?.image}
                    alt={name || 'Service'}
                    className='my-10'
                />
            </div>

            <Link
                to={`/categories/${catId}/services/${id}/`}
                className='mb-10 btn-primary'
            >
                Get a quote
            </Link>
        </li>
    )
}

export default ServiceCard