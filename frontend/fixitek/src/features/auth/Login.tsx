import React, { useState } from "react";
import ErrorDisplay from "@/components/ErrorDisplay";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { useAuth } from "./hooks/useAuth";


const Login = () => {
  const { loading, error, login } = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form);
  }

  const fields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login to your account</h1>

      {error && <ErrorDisplay message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, label, type }) => (
          <InputField
            key={name}
            id={name}
            name={name}
            label={label}
            type={type}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            required
          />
        ))}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};


export default Login;