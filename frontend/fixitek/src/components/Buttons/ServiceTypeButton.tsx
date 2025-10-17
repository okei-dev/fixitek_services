import React, { useMemo } from 'react'
import type { ServiceTypeButtonProps } from '@/types/serviceTypes'
import clsx from 'clsx'
import Spinner from '@/components/Spinner'




const ServiceTypeButtonGroup: React.FC<ServiceTypeButtonProps> = ({ options, className = '', activeValue }) => {

    return (
        <div className={clsx(`flex gap-2 flex-wrap ${className}`)}>
            {options.map(({ value, label, onClick, icon: Icon, disabled, loading }) => {
                const isActive = value === activeValue;

                return (
                    <button
                        key={value}
                        onClick={onClick}
                        disabled={disabled}
                        className={clsx(`px-4 py-2 rounded border flex items-center gap-2 transition
                        ${isActive
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }
                        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`)
                        }
                    >
                        {loading ? (
                            <Spinner size="sm" />
                        ) : (
                            <>
                                {<Icon />}
                                <span>{label}</span>
                            </>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default ServiceTypeButtonGroup