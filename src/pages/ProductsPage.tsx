import { useQuery } from "@tanstack/react-query";
import { Product } from "../lib/types";
import { fetchProducts } from "../lib/api";
import { Card, CardContent, CardTitle } from "../components/ui/card";

function ProductsPage() {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <main className="p-4 ">
      <h1 className="text-center">Products</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="w-full flex justify-center items-center p-4">
        <div className="flex flex-wrap gap-2">
          {data &&
            data.map((product) => (
              <Card key={product._id} className="min-w-60 w-64">
                <CardTitle>{product.name}</CardTitle>
                <CardContent className="flex">
                  <p>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
