import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // Adjust the path as needed
import ApiService from '../api/ApiService';
import Link from "next/link";
import CartDrawer from '@/components/CartDrawer';

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
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { cart } = useCart(); // ✅ Use the global cart context
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const api = new ApiService('http://localhost:3003/api');

  useEffect(() => {
    if (!id) return;
        api.get<[]>('/product/'+id)
          .then((data) => {
            console.log(data);
          setProduct(data.product);
      })
      .catch((err) => setError(err.message));

  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <main className="mx-auto">
        
        <div className="mb-8">

<div className="flex justify-between items-center px-12">
  <Link
    href="/shop"
    className="inline-flex items-center gap-2 px-4 py-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition"
  >
    ← Back
  </Link>

  <button
    onClick={() => setCartOpen(true)}
    className="relative bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
  >
    Cart
    {cartItemsCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
        {cartItemsCount}
      </span>
    )}
  </button>
</div>






        </div>
        <div className="p-6 max-w-md mx-auto">
          
          <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>

          <img src={product.image} alt={product.image} className="w-full h-64 object-cover mb-4" />
          <p className="text-gray-600 text-lg mb-2">{product.product_price}</p>
          <p className="text-sm text-gray-500 mb-4">
            {product.description || "No description available."}
          </p>

          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

        </div>
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </main>
  );
}
