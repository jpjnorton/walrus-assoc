import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.product_price) * item.quantity,
    0
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />


      {/* Drawer */}
      <div
        className="ml-auto w-80 bg-white h-full shadow-lg flex flex-col animate-slide-in"
        style={{ zIndex: 60 }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-start border-b pb-2"
                >
                  <div className="flex-1 pr-2">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-600">${item.product_price}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-1 text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Subtotal + Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <p className="text-right font-semibold mb-4">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


