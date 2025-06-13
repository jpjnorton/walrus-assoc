import { useRouter } from 'next/router';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  product_name: string;
  product_price: string;
  image: string;
  onAddToCart?: () => void;
}

export default function ProductCard({
  id,
  product_name,
  product_price,
  image,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onClick={handleCardClick}>
      <Image
        src={image}
        alt={product_name}
        width={400}
        height={400}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{product_name}</h2>
        <p className="text-gray-600 mb-2">${product_price}</p>
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
