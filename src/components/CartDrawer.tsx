import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart } = useCart();
  const router = useRouter();
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Drawer */}
      <div className="ml-auto w-80 bg-white h-full shadow-lg flex flex-col" style={{ zIndex: 2 }}>
        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose}>
              <p>X</p>
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price} × {item.quantity}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>


        {cart.length > 0 && (
          <div className="p-4 border-t bg-white">
            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
