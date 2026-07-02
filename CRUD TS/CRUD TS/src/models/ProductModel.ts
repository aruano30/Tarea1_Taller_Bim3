export enum ProductCategory {
  TECHNOLOGY = "Technology",
  HOME = "Home",
  SERVICES = "Services",
  CLOTHING = "Clothing",
}

export enum ProductStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  OUT_OF_STOCK = "Out of Stock",
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
  status: ProductStatus;
}