import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react'


interface Order {
    id: number
    status: string
    customer: {
        user: {
            first_name: string
            last_name: string
        }
    }
}


const Dashboard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [recentOrders, setRecentOrders] = useState<Order[]>([])
    const [loadingOrders, setLoadingOrders] = useState<boolean>(true)
    const [stats, setStats] = useState({
        totalServices: 0,
        activeOrders: 0,
        pendingRequests: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [servicesRes, activeOrdersRes, pendingRes] = await Promise.all([
                    api.get('/app/services/total_services/'),
                    api.get('/app/orders/active/'),
                    api.get('/app/orders/pending/'),
                ])


                setStats({
                    totalServices: servicesRes.data.total_services,
                    activeOrders: activeOrdersRes.data.length,
                    pendingRequests: pendingRes.data.length,
                })



            } catch (error) {
                console.error('Failed to load dashboard data:', error);

            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const res = await api.get('/app/orders/recent/');
                setRecentOrders(res.data)
            } catch (error) {
                console.error('Error fetching recent orders:', error);

            } finally {
                setLoadingOrders(false)
            }
        }

        fetchRecentOrders()
    }, [])


    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Services</h2>
                    <p className="text-4xl font-bold">{stats.totalServices}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Active Orders</h2>
                    <p className="text-4xl font-bold">{stats.activeOrders}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
                    <p className="text-4xl font-bold">{stats.pendingRequests}</p>
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>

                {loadingOrders ? (
                    <p>Loading recent orders...</p>
                ) : recentOrders.length === 0 ? (
                    <p>No recent orders.</p>
                ) : (
                    <ul className='space-y-4'>
                        {recentOrders.map((order) => (
                            <li key={order.id} className='p-4 bg-white rounded shadow'>
                                <p>
                                    <strong>Order #{order.id}</strong> —  {order.customer.user.first_name} {order.customer.user.last_name}
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
