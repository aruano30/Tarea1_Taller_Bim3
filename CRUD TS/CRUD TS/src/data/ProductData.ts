import { Product, ProductCategory, ProductStatus } from "../models/ProductModel";

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy A35",
    price: 289.99,
    stock: 25,
    category: ProductCategory.TECHNOLOGY,
    status: ProductStatus.ACTIVE,
  },
  {
    id: 2,
    name: "Silla Ergonómica",
    price: 149.5,
    stock: 12,
    category: ProductCategory.HOME,
    status: ProductStatus.ACTIVE,
  },
  {
    id: 3,
    name: "Chaqueta Deportiva",
    price: 79.99,
    stock: 8,
    category: ProductCategory.CLOTHING,
    status: ProductStatus.INACTIVE,
  },
];