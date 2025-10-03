import { getOrderItemCount } from "@/features/order/orderApi";
import { getStoredCartId } from "@/lib/helper";
import { useEffect, useState } from "react"


export const useCartItemCount = () => {
    const [itemCount, setItemCount] = useState<number>(0);

   useEffect(() => {
    const fetchItemCount = async () => {
        const cartId = getStoredCartId();
        if (!cartId) return;

        try {
            const count = await getOrderItemCount(cartId);
            setItemCount(count);
        } catch (error) {
            console.error('Failed to get Order items quantity.', error);
        }
    };

    fetchItemCount();
   }, []);

   return itemCount;
};