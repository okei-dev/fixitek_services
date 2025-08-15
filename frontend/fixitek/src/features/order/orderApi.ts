import { api } from "@/lib/api";


export interface OrderItem {
    id: number;
    service: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
    price: number;
}


export const getOrderItemCount = async (cartId: string): Promise<number> => {
    if (!cartId) throw new Error("Card ID is required.");

    const res = await api.get<OrderItem[]>(`/app/orders/${cartId}/items/`);
    return res.data.length;

}