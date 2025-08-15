import { api } from "@/lib/api"



export const createCart = async () => {
    const res = await api.post('/app/carts/');
    
    return res.data;
}


export const getCart = async (cartId: string) => {
    const res = await api.get(`/app/carts/${cartId}/`);
    return res.data;
}


export const addToCart = async (
    cartId: string,
    item: { service_id: number; quantity: number}
) => {
    const res = await api.post(`/app/carts/${cartId}/items/`, item);
    return res.data;
}


export const updateCartItem = async (
    cartId: string,
    itemId: number,
    data: { quantity: number }
) => {
    const res = await api.patch(`/app/carts/${cartId}/items/${itemId}`, data);
    return res.data;
}


export const removeFromCart = async (
    cartId: string,
    itemId: number
) => {
    const res = await api.delete(`/app/carts/${cartId}/items/${itemId}`)
    return res.data;
}


export const clearCart = async (cartId: string) => {
    const res = await api.delete(`/app/carts/${cartId}/clear/`);
    return res.data;
}