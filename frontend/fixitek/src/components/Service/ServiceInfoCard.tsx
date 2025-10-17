import { Service } from "@/types/service";
import { ServiceImage } from "../ServiceImage";

interface Props {
    service: Service;
}

export const ServiceInfoCard = ({ service }: Props) => {
    const { name, description, images, tags, price } = service;

    return (
        <div className="my-10 mx-4 p-5 rounded-xl shadow bg-[var(--neutral--100)]">
            <h2 className="py-2 text-2xl">{name}</h2>
            <p className="mb-4 py-2">{description}</p>

            <ServiceImage src={images?.[0]?.image} alt={name} />

            {tags?.length > 0 && (
                <span className="text-xl italic">#{tags[0].name}</span>
            )}

            <p className="mt-4 text-2xl">${price}</p>
        </div>
    )
}