import React from 'react'
import { InputFieldProps } from '@/types/inputField'


const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    name,
    type,
    value,
    placeholder = '',
    required = false,
    onChange,
}) => {
  return (
    <div>
        <label htmlFor={id} className='block mb-1 text-sm font-medium'>
            {label}
        </label>
        <input 
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400'
            />
    </div>
  )
}

export default InputField