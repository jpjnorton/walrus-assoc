import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // Adjust the path as needed

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const { cart } = useCart(); // ✅ Use the global cart context
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Replace this with a real API call
    const fetchProduct = async () => {
      // Mock data for demo purposes
      const mockProductData: Product[] = [
        { id: '1', name: 'Hat', price: '$20', image: '/hat.jpg', description: 'Cool summer hat' },
        { id: '2', name: 'Shirt', price: '$35', image: '/shirt.jpg', description: 'Cotton t-shirt' },
      ];

      const found = mockProductData.find((p) => p.id === id);
      if (found) setProduct(found);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
          <button onClick={() => setCartOpen(true)} className="relative bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemsCount}
              </span>
            )}
          </button>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-600 text-lg mb-2">{product.price}</p>
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
  );
}
