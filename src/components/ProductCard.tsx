interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    image: string;
    onAddToCart?: () => void;
  }
  
  export default function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps)
  
  {
    console.log(name)
    return (
      <div className="border p-4 rounded-lg hover:shadow-md transition">
        
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">{price}</p>
        <button
            onClick={() => {
                onAddToCart?.();
            }}
            className="mt-3 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
            Add to Cart
            </button>

      </div>
    );
  }
  