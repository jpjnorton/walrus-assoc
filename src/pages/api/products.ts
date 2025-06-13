// Fake backend TEMP
export const runtime = "edge";

// Match the backend's product shape
const products = [
  {
    id: "1",
    product_name: "Walrus Patch",
    product_price: "10",
    image: "/images/walrus-patch.jpg",
  },
  {
    id: "2",
    product_name: "Walrus Hat",
    product_price: "30",
    image: "/images/walrus-hat.jpg",
  },
  {
    id: "3",
    product_name: "Walrus Sticker",
    product_price: "5",
    image: "/images/walrus-sticker.jpg",
  },
];

// Edge API handler for Next.js
export default function handler() {
  return new Response(
    JSON.stringify({ success: true, products }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
