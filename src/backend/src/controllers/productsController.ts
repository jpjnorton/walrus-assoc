import { Request, Response } from 'express';


const products = [
    { id: 1, product_name: "Walrus Patch", product_price: 10, image: "/images/walrus-patch.jpg" },
    { id: 2, product_name: "Walrus Hat", product_price: 30, image: "/images/walrus-hat.jpg" },
    { id: 3, product_name: "Walrus Sticker", product_price: 5, image: "/images/walrus-sticker.jpg" }
];

export const getProducts = (req: Request, res: Response): void => {
  res.json({ success: true, products });
};

export const getProductById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json({ success: true, product });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};
