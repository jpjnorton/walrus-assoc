import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
// import Web3Toggle from "@/components/Web3Toggle";

const products = [
  { id: "1", name: "Walrus Patch", price: "$25", image: "/images/walrus-patch.jpg" },
  { id: "2", name: "Limited Edition Tee", price: "$40", image: "/images/walrus-shirt.jpg" },
];

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
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-10">Storefront</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              
              onAddToCart={() => addToCart({ id: product.id, name: product.name })}
            />
          ))}
          
        </div>
      </main>
    </>
  );
}



