import React, { useEffect, useState } from 'react'
import Button from '@/components/Buttons/Button';
import ErrorDisplay from '@/components/ErrorDisplay';
import { ServiceImage } from '@/components/ServiceImage';
import { useParams } from 'react-router-dom';
import { addToCart } from '../cart/cartApi';
import { getStoredCartId } from '@/lib/helper';
import { Service } from '@/types/service';
import { getService } from './serviceApi';
import ServiceTypeButtonGroup from '@/components/Buttons/ServiceTypeButton';
import { serviceTypes } from '@/types/serviceTypes';
import { useServiceDetail } from '@/hooks/useServiceDetail';
import { ServiceInfoCard } from '@/components/Service/ServiceInfoCard';
import { QuantitySelector } from '@/components/Service/QuantitySelector';


const ServiceDetail = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const parsedServiceId = Number(serviceId);

    const {
        service,
        loading,
        error,
        cartError,
        adding,
        handleAddToCart,
    } = useServiceDetail(parsedServiceId);

    const [quantity, setQuantity] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [loadingType, setLoadingType] = useState<string | null>(null);
    const [showInfoCard, setShowInfoCard] = useState(false);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity((prev) => (prev - 1));
    };

    const handleTypeChange = (type: string) => {
       setLoadingType(type);

       setTimeout(() => {
        if (selectedType === type) {
            setSelectedType(null);
            setShowInfoCard(false);
        } else {
            setSelectedType(type);
            setShowInfoCard(true);
        }

        setLoadingType(null);
       }, 500);
    }
    console.log('service', service)
    console.log('service_types', service?.service_types?.[0]?.service_type)

    if (loading) return <p className='text-2xl text-center mt-8'>Loading...</p>
    if (error || !service) return <ErrorDisplay message={error || 'Service not found.'} />
    

    return (
        <main>
            <div className='relative mt-8 mx-4 shadow'>
                <ServiceImage
                    src={service.category?.photo_url || '/img/servicebgfinal.jpg'}
                    alt={service.category?.name}
                />
                <div className='absolute inset-0 p-4 bg-neutral-800/50 text-[var(--neutral--100)] z-10 rounded-xl flex flex-col items-center'>
                    <h1 className='py-2 text-3xl'>{service.category.name} Services</h1>
                    <p className='py-2 '>{service.category?.description}</p>
                </div>
            </div>
            <div>
                <h2 className='mt-8 text-center text-xl font-semibold'>Choose Your Service Type:</h2>
                <ServiceTypeButtonGroup 
                    options={serviceTypes.map((type) => ({
                        ...type,
                        onClick: () => handleTypeChange(type.value),
                        loading: selectedType === type.value,
                    }))} 
                    activeValue={selectedType} />

                {showInfoCard && service.service_types?.[0].service_type === selectedType && (
                    <ServiceInfoCard service={service} />
                )}

                <QuantitySelector
                    quantity={quantity}
                    onDecrement={decrement}
                    onIncrement={increment}
                    />
            </div>

            <div className='my-6 p-4'>
                <Button
                    onClick={() => handleAddToCart(quantity)}
                    disabled={adding}
                    className='w-full'
                >
                    {adding ? 'Adding...' : `Add ${quantity} to Cart`}
                </Button>
            </div>

            {cartError && <ErrorDisplay message={cartError} />}

        </main>
    )
}

export default ServiceDetail;