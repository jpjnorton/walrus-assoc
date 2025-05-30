import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { pathname } = useRouter();

  const { cart } = useCart(); // ✅ Use the global cart context
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const linkClass = (path: string) =>
    `hover:text-black transition-colors ${
      pathname === path ? "font-bold text-black underline" : "text-gray-700"
    }`;

  return (
    <span>
    <nav className=" top-0 w-full z-50 backdrop-blur bg-white/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          Walrus Association
        </Link>
        <div className="space-x-6 text-lg">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/#about" className={linkClass("/#about")}>
            About
          </Link>
          <Link href="/shop" className={linkClass("/shop")}>
            Shop
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </span>
  );
}
