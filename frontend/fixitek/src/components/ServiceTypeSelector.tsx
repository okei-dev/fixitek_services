import { useState } from "react";
import { FaCogs, FaTools, FaWrench } from "react-icons/fa";
import ServiceTypeButtonGroup from "./Buttons/ServiceTypeButton";

const servicesByType = {
    ASSEMBLY: ['Assembly'],
    INSTALLATION: ['Installation'],
    MOUNTING: ['Mounting'],
};

const ServiceTypeSelector = () => {
    const [selectedType, setSelectedType] = useState('ASSEMBLY');
    const [loadingType, setLoadingType] = useState<string | null>(null);

    const handleTypeChange = (type: string) => {
        setLoadingType(type);
        setTimeout(() => {
            setSelectedType(type);
            setLoadingType(null);
        }, 500);
    };

    const serviceTypes = [
        { value: 'ASSEMBLY', label: 'Assembly', icon: <FaWrench /> },
        { value: 'INSTALLATION', label: 'Installation', icon: <FaTools /> },
        { value: 'MOUNTING', label: 'Mounting', icon: <FaCogs /> },
    ];

    const options = serviceTypes.map(({ value, label, icon }) => ({
        value,
        label,
        icon,
        onClick: () => handleTypeChange(value),
        loading: loadingType === value,
    }));

    return (
        <div className="p-4">
            <ServiceTypeButtonGroup options={options} activeValue={selectedType} />

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">{selectedType} Services</h2>
                <ul className="list-disc pl-6">
                    {servicesByType[selectedType].map((service, i) => (
                        <li key={i}>{service}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default ServiceTypeSelector;