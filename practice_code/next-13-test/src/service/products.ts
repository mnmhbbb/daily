import path from 'path';
import { promises as fs } from 'fs';

export type ProductsType = {
  id: string;
  name: string;
  price: number;
};

export const getProducts = async () => {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const productsData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(productsData);
};

export const getProduct = async (id: string): Promise<ProductsType | undefined> => {
  const products = await getProducts();
  return products.find((product: ProductsType) => product.id === id);
};
