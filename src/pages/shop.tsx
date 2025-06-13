import { useEffect, useState } from "react";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import ApiService from "./api/ApiService";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  product_name: string;
  product_price: string;
  image: string;
}

const api = new ApiService("http://localhost:3003/api");

export default function Shop() {
  const { cart, addToCart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ products: Product[] }>("/products")
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Shop | Walrus Association</title>
      </Head>

      <main className="mx-auto">
        <Navbar />
        <div className="px-6 py-20">
          {loading && (
            <p className="text-center text-gray-500 text-lg">Loading products...</p>
          )}

          {error && (
            <p className="text-center text-red-600 text-lg">{error}</p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-600 text-lg">No products available.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                product_name={product.product_name}
                product_price={product.product_price}
                image={product.image}
                onAddToCart={() => addToCart({ ...product, quantity: 1 })}
              />
            ))}
          </div>
        </div>
      </main>
      
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
