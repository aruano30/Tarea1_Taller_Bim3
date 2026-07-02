import { Product, ProductCategory, ProductStatus } from "../models/ProductModel";
import { products } from "../data/ProductData";

let nextId = 4;

export const createProduct = (
  name: string,
  price: number,
  stock: number,
  category: ProductCategory,
  status: ProductStatus
): Product => {
  const product: Product = {
    id: nextId,
    name,
    price,
    stock,
    category,
    status,
  };
  products.push(product);
  nextId++;
  return product;
};

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const updateProduct = (
  id: number,
  fields: Partial<Product>
): Product | undefined => {
  const product = products.find((p) => p.id === id);
  if (!product) return undefined;
  Object.assign(product, fields);
  return product;
};

export const deleteProduct = (id: number): boolean => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

export const validateProduct = (p: Product): string[] => {
  const errors: string[] = [];
  if (p.name.trim().length === 0) {
    errors.push("name cannot be empty");
  }
  if (p.price <= 0) {
    errors.push("price must be greater than 0");
  }
  if (p.stock < 0) {
    errors.push("stock cannot be negative");
  }
  return errors;
};