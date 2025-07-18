import { useCart } from "../context/CartContext";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

function useMeritBalance() {
  return {
    balance: 100,
    spendMerit: (amount: number) => {
      console.log(`Spending ${amount} Merit...`);
    },
  };
}

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { balance, spendMerit } = useMeritBalance();
  const [useMerit, setUseMerit] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );
  const subtotalInMerit = subtotal * 10;

  const handleCheckout = () => {
    if (useMerit) {
      if (subtotalInMerit > balance) {
        alert("Not enough Merit. Go complete a challenge to earn more!");
        return;
      }
      spendMerit(subtotalInMerit);
      alert(`Order placed using ${subtotalInMerit} Merit!`);
    } else {
      alert("Order placed with traditional method!");
    }
  };

  return (
    <>
      <Head>
        <title>Checkout | Walrus Association</title>
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition"
          >
            ← Back to Store
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Shop Pay */}
          <div className="flex justify-center items-start">
            <a
              href="https://shop.app/pay"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src="/images/shop-pay-button.svg"
                alt="Pay with Shop Pay"
                width={240}
                height={60}
              />
            </a>
          </div>

          {/* Right: Cart Summary */}
          <div>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-6 mb-10">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-start border-b pb-4"
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          ${item.price}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </li>
                  ))}
                </ul>

                <div className="mb-6 space-y-2">
                  <p className="text-lg font-semibold text-right">
                    Subtotal: ${subtotal.toFixed(2)} (~{subtotalInMerit}{" "}
                    Merit)
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="useMerit"
                      checked={useMerit}
                      onChange={() => setUseMerit(!useMerit)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="useMerit"
                      className="text-sm text-gray-700"
                    >
                      Use my Merit (Balance: {balance})
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition"
                >
                  {useMerit
                    ? `Complete Order with ${subtotalInMerit} Merit`
                    : "Complete Order"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
