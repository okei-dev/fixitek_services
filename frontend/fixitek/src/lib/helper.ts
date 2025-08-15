const   CART_ID_KEY = 'cart_id';

export const storeCartId = (cartId: string) => {
    localStorage.setItem(CART_ID_KEY, cartId)
}


export const getStoredCartId = (): string | null => {
    return localStorage.getItem(CART_ID_KEY)
}


export const clearCartId = () => {
    localStorage.removeItem(CART_ID_KEY)
}