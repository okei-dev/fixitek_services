import React, { useState } from 'react'
import { fields } from '@/lib/fields';
import InputField from '@/components/InputField';
import ErrorDisplay from '@/components/ErrorDisplay';
import Button from '@/components/Buttons/Button';
import { useAuth } from './hooks/useAuth';


const Register = () => {
    const { loading, error, register } = useAuth();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(form);
    }


    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl'>
            <h1 className='text-2xl font-semibold text-center mb-6'>Create an Account</h1>

            {error && <ErrorDisplay message={error} />}

            <form onSubmit={handleSubmit} className='space-y-4'>
                {fields.map(({ name, label, type, placeholder }) => (
                    <InputField
                        key={name}
                        id={name}
                        name={name}
                        label={label}
                        type={type}
                        placeholder={placeholder}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        required
                    />
                ))}

                <Button
                    type='submit'
                    disabled={loading}
                    className='w-full transition'
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </Button>
            </form>
        </div>
    )
}

export default Register