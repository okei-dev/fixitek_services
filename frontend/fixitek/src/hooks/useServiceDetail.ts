import { addToCart } from "@/features/cart/cartApi";
import { getService } from "@/features/services/serviceApi";
import { getStoredCartId } from "@/lib/helper";
import { Service } from "@/types/service"
import { useEffect, useState } from "react"

export const useServiceDetail = (serviceId: number | null ) => {
    const [service, setService] = useState<Service |  null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartError, setCartError] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    const cartId = getStoredCartId();

    useEffect(() => {
        if (!serviceId) return;

        const fetchService = async () => {
            try {
                const data = await getService(serviceId);
                setService(data);
            } catch (error) {
                console.error('Error loading service', error);
                setError('Failed to load service.');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);


    const handleAddToCart = async (quantity: number) => {
        if (!cartId || !serviceId) return;

        try {
            setAdding(true);
            await addToCart(cartId, { service_id: serviceId, quantity });
        } catch (error) {
            setCartError('Failed to add item to cart.');
        } finally {
            setAdding(false);
        }
    };

    return {
        service,
        loading,
        error,
        cartError,
        adding,
        handleAddToCart,
    };
}