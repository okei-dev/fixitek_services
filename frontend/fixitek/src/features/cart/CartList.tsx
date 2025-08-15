import React from 'react';
import { useCart } from './cartContext';
import CartItem from './CartItem';

const CartList: React.FC = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return <p className="text-gray-600">Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p className="text-gray-500">Your cart is empty.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}  
          service_name={item.service_name}
          quantity={item.quantity}
        />
      ))}
    </section>
  );
};

export default CartList;
