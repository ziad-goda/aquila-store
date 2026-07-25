export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  category: "hoodies" | "pants";
  images: string[];
  sizes: string[];
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  created_at: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}
