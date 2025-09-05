import React, { useEffect, useState } from "react";
import { getServicesByCategory } from "./serviceApi";
import { GoArrowRight } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { Service } from "@/types/service";


const ServiceList: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchServiceList = async () => {
        if (!categoryId) return;

        const id = Number(categoryId);
        if (isNaN(id)) return;

        setLoading(true)

        try {
            const data = await getServicesByCategory(id);
            setServices(data)
        } catch (error) {
            console.error('Failed to fetch services', error);

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServiceList()
    }, [categoryId]);

    if (loading) return <p>Loading services...</p>

    return (
        <div className="mt-10">
            <ul className="mx-4 ">
                {services.map((service) => (
                    <li
                        key={service.id}
                        className='bg-[var(--secondary--color-3)] mb-2'
                    >
                        <h2 className='p-2 text-2xl'>{service.name}</h2>
                        <p className='p-2 text-base'>{service.description}</p>
                        <Link 
                            to={`/services/${service.id}/`}
                            className='btn-primary'
                            >
                            Get a quote
                            <GoArrowRight />
                        </Link>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceList