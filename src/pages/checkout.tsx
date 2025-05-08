import { useCart } from "../context/CartContext";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { ethers } from 'ethers';


async function connectUp() {
  // Check if Lukso wallet is injected into the browser
  if (typeof window !== "undefined" && (window as any).lukso) {
    const provider = new ethers.BrowserProvider((window as any).lukso);

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Connected with", accounts[0]);
      return accounts[0];
    } catch (err) {
      console.error("Failed to connect to Lukso:", err);
    }
  } else {
    alert("Lukso wallet not found. Please install the Lukso browser extension.");
  }
}


// Placeholder Marret wallet hook
function useMarretBalance() {
connectUp()
  return {
    balance: 100, // Example: 100 Marret tokens
    spendMarret: (amount: number) => {
      console.log(`Spending ${amount} Marret...`);
      // Connect your smart contract interaction here
    },
  };
}

export default function CheckoutPage() {
  const { cart } = useCart();
  const { balance, spendMarret } = useMarretBalance();
  const [useMarret, setUseMarret] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const subtotalInMarret = subtotal * 10; // 1 USD = 10 Marret

  const handleCheckout = () => {

    if (useMarret) {
      if (subtotalInMarret > balance) {
        alert("Not enough Marret. Go complete a challenge to earn more!");
        return;
      }
      spendMarret(subtotalInMarret);
      alert(`Order placed using ${subtotalInMarret} Marret!`);
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
          {/* Left: Shop Pay Button */}
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

          {/* Right: Cart Summary and Unified Checkout */}
          <div>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-6 mb-10">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b pb-4"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.price} × {item.quantity}
                        </p>
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
                    Subtotal: ${subtotal.toFixed(2)} (~{subtotalInMarret} Marret)
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="useMarret"
                      checked={useMarret}
                      onChange={() => setUseMarret(!useMarret)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="useMarret" className="text-sm text-gray-700">
                      Use my Marret (Balance: {balance})
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition"
                >
                  {useMarret ? `Complete Order with ${subtotalInMarret} Marret` : "Complete Order"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
