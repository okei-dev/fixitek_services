import { api } from '@/lib/api'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Register = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState<{ username: string; email: string, password: string }>({ username: '', email: '', password: '' })

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await api.post('/auth/users/', form);
            console.log(`${form.username} was successfully registered.`);
            window.alert(`${form.username} was successfully registered.`)

            navigate('/')
        } catch (error: any) {
            const data = error.response?.data;
            if (data?.username?.[0]?.includes('already exists'))
                setError('User already exists.');
            console.error("Registration error:", data)

        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
            <h1 className="text-2xl font-semibold text-center mb-6">Create an Account</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1 text-sm font-medium">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>
        </div>
    )
}


export default Register;
