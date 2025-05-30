import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import ApiService from "./api/ApiService";


interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  onAddToCart?: () => void;
}


const api = new ApiService('http://localhost:3003/api');


export default function Shop() {
  const { cart } = useCart(); // ✅ Use the global cart context
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<[]>('/products')
      .then((data) => {
        console.log('Fetched products:', data.products);
        setProducts(data.products);
      })
      .catch((err) => setError(err.message));
  }, []);

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

          <button onClick={() => setCartOpen(true)} className="relative bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-10">Store Front (In Production)</h1>
            
      { products.length > 0 &&
  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() =>
                // This gets passed to the ProductCard component
                // and calls addToCart when user clicks "Add to Cart"
                cart.push({ ...product, quantity: 1 }) // or better, call `addToCart`
              }
            />
          ))}
        </div>


        }

  
   
      </main>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

