import axios from "axios";

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

export async function fetchProducts() {
  try {
    const { data } = await api.get("/product");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProduct(productId: string) {
  try {
    const { data } = await api.get(`/product/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllCartItems() {
  try {
    const { data } = await api.get(`/cart`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
