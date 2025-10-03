import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import type { Order } from '@/types/order';
import StatCard from '@/components/StatCard';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Dashboard = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [stats, setStats] = useState({
        totalServices: 0,
        activeOrders: 0,
        pendingRequests: 0
    });

    const [recentOrders, setRecentOrders] = useState<Order[]>([])


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [servicesRes, activeOrdersRes, pendingRes, recentRes] = await Promise.all([
                    api.get('/app/services/'),
                    api.get('/app/orders/active/'),
                    api.get('/app/orders/pending/'),
                    api.get('/app/orders/recent/')
                ])
                
                setStats({
                    totalServices: servicesRes.data.count,
                    activeOrders: activeOrdersRes.data.length,
                    pendingRequests: pendingRes.data.length,
                });
                
                setRecentOrders(recentRes.data);
                console.log("recentOrders: ", recentRes);

            } catch (error) {
                setError('Failed to load dashboard data.')
                console.error('Dashboard error:', error);

            } finally {
                setLoading(false)
            }
        };


        fetchDashboard()
    }, []);



    if (loading) return <p className='text-center mt-8'>Loading...</p>
    if (error) return <p className='text-center mt-8 text-red-600'>{error}</p>

    return (
        <main className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={logout}
                    className='text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>
                        Logout
                    </button>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <StatCard title="Total Services" value={stats.totalServices} />
                <StatCard title="Active Orders" value={stats.activeOrders} />
                <StatCard title="Pending Requests" value={stats.pendingRequests} />
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>

                {recentOrders.length === 0 ? (
                    <p>Loading recent orders...</p>
                ) : (
                    <ul className='space-y-4'>
                        {recentOrders.map((order) => (
                            <li key={order.id} className='p-4 bg-white rounded shadow'>
                                <p>
                                    <strong>Order #{order.id}</strong> —{" "}
                                    {order.customer?.user?.first_name} {" "}
                                    {order.customer?.user?.last_name} 
                                </p>
                                <p>
                                    Status: {' '}
                                    <span
                                        className={
                                            order.status === 'COMPLETED'
                                                ? 'text-green-600 font-semibold'
                                                : order.status === 'PENDING'
                                                    ? 'text-yellow-600 font-semibold'
                                                    : 'text-gray-600 font-semibold'
                                        }
                                    >
                                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Dashboard
