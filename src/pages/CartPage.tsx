import { useQuery } from "@tanstack/react-query";
import { fetchAllCartItems } from "../lib/api";
import { CartItem } from "../lib/types";
import { Card, CardContent, CardTitle } from "../components/ui/card";

function CartPage() {
  const { data, error, isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: fetchAllCartItems,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {data &&
          data.map((cartItem) =>
            cartItem.products.map((product) => (
              <li key={product._id}>
                <Card className="min-w-60 w-64">
                  <CardTitle>{product.name}</CardTitle>
                  <CardContent className="flex">
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </CardContent>
                </Card>
              </li>
            ))
          )}
      </ul>
    </>
  );
}

export default CartPage;
