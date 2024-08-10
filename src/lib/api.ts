import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("jwt-taskify") as string;
    // removing the first and last character of the token, which are quotes
    token = token?.slice(1, -1);

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function fetchProducts(name?: string, category?: string) {
  const { data } = await api.get("/product", { params: { name, category } });
  return data;
}

export async function fetchProduct(productId: string) {
  const { data } = await api.get(`/product/${productId}`);
  return data;
}

export async function fetchAllCartItems() {
  const { data } = await api.get(`/cart`);
  return data;
}

export async function addToCart(productId: string) {
  const { data } = await api.patch("/cart/create", { productId: productId });
  return data;
}

export async function removeFromCart(productId: string) {
  const { data } = await api.patch(`/cart/delete`, { productId: productId });
  return data;
}
