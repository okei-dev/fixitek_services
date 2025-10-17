interface Props {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export const QuantitySelector = ({ quantity, onIncrement, onDecrement }: Props) => {
    return (
        <div className="mt-6 flex items-center justify-center gap-4">
            <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="px-3 py-1 border rounded text-lg"
            >
                -
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
                onClick={onIncrement}
                className="px-3 py-1 border rounded text-lg"
            >
                +
            </button>
        </div>
    )
}