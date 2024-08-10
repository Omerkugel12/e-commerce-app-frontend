import { useQuery } from "@tanstack/react-query";
import { Product } from "../lib/types";
import { fetchProducts } from "../lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("name") || "";
  const categoryQuery = searchParams.get("category") || "";

  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products", searchQuery, categoryQuery],
    queryFn: () => fetchProducts(searchQuery, categoryQuery),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: e.target.value, category: categoryQuery });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ name: searchQuery, category: e.target.value });
  };

  return (
    <main className="p-4 ">
      <h1 className="text-center">Products</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by product name..."
      />
      <select
        name="category"
        id="category"
        value={categoryQuery}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Grains">Grains</option>
        <option value="Meat">Meat</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Fruits">Fruits</option>
      </select>
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
                <CardFooter>
                  <Button>
                    <Link to={`/product/${product._id}`}>
                      View {product.name}'s details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
