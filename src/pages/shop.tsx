import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import ApiService from "./api/ApiService";
import Navbar from "@/components/Navbar";


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
      
      <main className="mx-auto">
        <Navbar />

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

