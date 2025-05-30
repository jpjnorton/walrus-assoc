import { Request, Response } from 'express';



const products = [
    { id: 1, product_name: "Walrus Patch", product_price: 25, image: "/images/walrus-patch.jpg" },
    { id: 2, product_name: "Limited Edition Tee", product_price: 40, image: "/images/walrus-shirt.jpg" },
    { id: 3, product_name: "Walrus Patch 2nd", product_price: 32, image: "/images/walrus-patch.jpg" },
    { id: 4, product_name: "Limited Edition Tee 2nd", product_price: 44, image: "/images/walrus-shirt.jpg" },
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


