import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/api";
import { useParams } from "react-router-dom";
import { Product } from "../lib/types";

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <h1>Invalid product ID</h1>;
  }

  const { data, error, isLoading, isFetching } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

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
    </>
  );
}

export default ProductDetailsPage;
