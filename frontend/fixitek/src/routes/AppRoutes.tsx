import Home from '@/pages/Home'
import Login from '@/features/auth/Login'
import Register from '@/features/auth/Register'
import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import NotFound from '@/pages/NotFound'
import CartPage from '@/pages/CartPage'
import Layout from '@/Layout'

const isAuthenticated = () => !!localStorage.getItem('access')

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to='/login' replace />
}
const AppRoutes = () => {

    const AppRoutes = () => {

    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route
                    path='/dashboard'
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/cartpage'
                    element={
                        <PrivateRoute>
                            <CartPage />
                        </PrivateRoute>
                    }
                />


                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes