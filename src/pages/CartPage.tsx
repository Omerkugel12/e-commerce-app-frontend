import { useQuery } from "@tanstack/react-query";
import { fetchAllCartItems } from "../lib/api";
import { CartItem } from "../lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function CartPage() {
  const {
    data: cartItems,
    error,
    isLoading,
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: fetchAllCartItems,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {cartItems &&
          cartItems.map((cartItems) =>
            cartItems.products.map((product) => (
              <li key={product._id}>
                <Card className="min-w-60 w-64">
                  <CardTitle>{product.name}</CardTitle>
                  <CardContent className="flex">
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Link to={`/product/${product._id}`}>
                        View {product.name}'s details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))
          )}
      </ul>
    </>
  );
}

export default CartPage;
