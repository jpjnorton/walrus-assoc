// pages/store.tsx
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const products = [
  {
    id: "walrus-sticker-pack",
    name: "Walrus Sticker Pack",
    price: 500, // price in cents
    image: "/walrus2.png",
    description: "High-quality vinyl stickers featuring the Walrus Association mascot.",
  },
];

const Store = () => {
  const router = useRouter();

  const handleCheckout = async (productId: string) => {
    try {
      const res = await fetch("https://api.walrusassociation.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Walrus Association Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl shadow">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-2">${(product.price / 100).toFixed(2)}</p>
            <button
              onClick={() => handleCheckout(product.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
