import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import ApiService from "../api/ApiService";
import Link from "next/link";
import CartDrawer from "@/components/CartDrawer";
import Head from "next/head";
import Image from "next/image";

interface Product {
  id: string;
  product_name: string;
  product_price: string;
  image: string;
  description?: string;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const api = new ApiService("http://localhost:3003/api");

  useEffect(() => {
    if (!id) return;

    api
      .get<{ product: Product }>(`/product/${id}`)
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading product...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex items-center justify-center min-h-screen text-red-600 text-lg">
        {error || "Product not found."}
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{product.product_name} | Walrus Association</title>
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition"
          >
            ← Back to Store
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="w-full aspect-[4/5] bg-gray-100 rounded overflow-hidden">
            <Image
              src={product.image}
              alt={product.product_name}
              width={500}
              height={625}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
            <p className="text-xl text-gray-700 mb-4">
              ${product.product_price}
            </p>
            <p className="text-gray-600 mb-6">
              {product.description || "No description available."}
            </p>

            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
