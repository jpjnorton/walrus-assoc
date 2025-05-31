import { useRouter } from 'next/router';


interface ProductCardProps {
  id: string;
  product_name: string;
  product_price: string;
  image: string;
  onAddToCart?: () => void;
}

export default function ProductCard({ id, product_name, product_price, image, onAddToCart }: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="border p-4 rounded-lg hover:shadow-md transition cursor-pointer" onClick={handleCardClick}>
      <h2 className="text-lg font-bold">{product_name}</h2>
      <p className="text-gray-600">{product_price}</p>
    </div>
  );
}
