import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  fetchAllCartItems,
  fetchProduct,
  removeFromCart,
} from "../lib/api";
import { useParams } from "react-router-dom";
import { CartItem, Product } from "../lib/types";
import { Button } from "../components/ui/button";

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <h1>Invalid product ID</h1>;
  }

  const {
    data: product,
    error,
    isLoading,
    isFetching,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: fetchAllCartItems,
  });

  const {
    mutate: addToCartMutation,
    isPending: addToCartPending,
    isError: isAddToCartError,
    error: addToCartError,
  } = useMutation({
    mutationFn: addToCart,
  });

  const {
    mutate: removeFromCartMutation,
    isError: isRemoveFromCartError,
    isPending: removeFromCartPending,
    error: removeFromCartError,
  } = useMutation({ mutationFn: removeFromCart });

  function handleAddToCart(productId: string) {
    addToCartMutation(productId);
  }

  function handleRemoveFromCart(productId: string) {
    removeFromCartMutation(productId);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isFetching) {
    return <p>Fetching...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const isProductInCart = cartItems?.some((cartItem) =>
    cartItem.products.some((product) => product._id === productId)
  );

  return (
    <>
      {product && <h1>{product.name}</h1>}
      <p>{product && product.description}</p>
      <p>${product && product.price}</p>
      {addToCartPending || (removeFromCartPending && <p>Submiiting...</p>)}
      {!addToCartPending && !removeFromCartPending && product && (
        <>
          <Button
            className={isProductInCart ? "text-red-600" : ""}
            onClick={() => handleAddToCart(product?._id)}
          >
            Add to Cart
          </Button>
          {isProductInCart && (
            <Button
              className={isProductInCart ? "text-red-600" : ""}
              onClick={() => handleRemoveFromCart(product?._id)}
            >
              Remove from cart
            </Button>
          )}
        </>
      )}
      {isAddToCartError && addToCartError && (
        <p>Error: {addToCartError.message}</p>
      )}
      {isRemoveFromCartError && removeFromCartError && (
        <p>Eroor: {removeFromCartError.message}</p>
      )}
    </>
  );
}

export default ProductDetailsPage;
