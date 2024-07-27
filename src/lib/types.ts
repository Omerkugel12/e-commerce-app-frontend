export interface User {
  _id: string;
  username: string;
  password: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  _id: string;
  user: string;
  products: Product[];
}
