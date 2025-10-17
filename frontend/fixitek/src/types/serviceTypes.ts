import React from "react";
import { FaCogs, FaTools, FaWrench } from "react-icons/fa";


export interface serviceTypeOption {
    value: string;
    label: string;
    onClick?: () => void;
    icon?: React.ComponentType;
    isActive?: boolean;
    disabled?: boolean;
    loading?: boolean;
}


export const serviceTypes: serviceTypeOption[] = [
    { value: 'ASSEMBLY', label: 'Assembly', icon: FaWrench },
    { value: 'INSTALLATION', label: 'Installation', icon: FaTools },
    { value: 'MOUNTING', label: 'Mounting', icon: FaCogs },
];


export interface ServiceTypeButtonProps {
    options: serviceTypeOption[];
    activeValue: string;
    className?: string;
}