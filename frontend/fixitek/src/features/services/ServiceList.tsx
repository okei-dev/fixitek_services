import { useEffect, useState } from "react";
import { getServicesByCategory } from "./serviceApi";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

type Category = {
    id: number;
    name: string;
}

type Tag = {
    id: number;
    name: string;
}

export type Service = {
    id: number;
    name: string;
    category: Category;
    tags: Tag[];

    created_at: string;
    updated_at: string;

    price?: string;
    estimated_time?: number;
    description: string;


    photo?: string | null;
}



const ServiceList = () => {
    const [services, setServices] = useState<Service[]>([]);

    const fetchServiceList = async () => {
        const data = await getServicesByCategory();
        setServices(data.results)
    }

    useEffect(() => {
        fetchServiceList()
    }, [])


    return (
        <div className="mt-4">
            <ul className="mx-4 ">
                {services.map((service, id) => (
                    <li key={id}>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                        <img src={service.photo} />
                        <div>
                            {service.tags.map((tag, id) => (
                                <span key={id}>{tag.name}</span>
                            ))}
                            <div>
                                <Link
                                    to="/services"
                                    className="inline-flex btn-secondary-small items-center gap-2"
                                >
                                    Learn more <GoArrowRight /></Link>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceList