
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
// import Web3Toggle from "@/components/Web3Toggle";


export default function Shop() {
  const { addToCart, cart } = useCart();

  // 🔢 Get total quantity from all cart items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Head>
        <title>Shop | Walrus Association</title>
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition"
          >
            ← Back to Home
          </Link>

          <Link href="/cart" className="relative">
            <p>Cart</p>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-10">Storefront</h1>

  
      </main>
    </>
  );
}



