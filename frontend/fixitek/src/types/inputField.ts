import React from "react";

export interface InputFieldProps {
    id: string;
    label: string;
    name: string;
    type: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}