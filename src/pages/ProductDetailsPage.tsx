import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, fetchProduct } from "../lib/api";
import { useParams } from "react-router-dom";
import { Product } from "../lib/types";
import { Button } from "../components/ui/button";

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <h1>Invalid product ID</h1>;
  }

  const { data, error, isLoading, isFetching } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  const {
    mutate,
    isPending,
    isError,
    error: addToCartError,
  } = useMutation({
    mutationFn: addToCart,
  });

  function handleAddToCart(productId: string) {
    mutate(productId);
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

  return (
    <>
      {data && <h1>{data.name}</h1>}
      <p>{data && data.description}</p>
      <p>${data && data.price}</p>
      {isPending && <p>Adding to cart...</p>}
      {!isPending && data && (
        <Button onClick={() => handleAddToCart(data?._id)}>Add to Cart</Button>
      )}
      {isError && addToCartError && <p>Error: {addToCartError.message}</p>}
    </>
  );
}

export default ProductDetailsPage;
