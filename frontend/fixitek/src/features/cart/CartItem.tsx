import { useCart } from "./cartContext";
import { useState } from "react";

type Props = {
  id: number;
  service_name: string;
  quantity: number;
};

const CartItem: React.FC<Props> = ({ id: service_id, service_name, quantity }) => {
  const { removeItem, addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeItem(service_id);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async () => {
    setLoading(true);
    try {
      await addItem({ service_id, quantity: 1 });
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow">
      <div>
        <p className="text-lg font-semibold">{service_name}</p>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>

        <div className="mt-1 space-x-2">
          <button
            onClick={handleIncrease}
            disabled={loading}
            className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            +
          </button>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
