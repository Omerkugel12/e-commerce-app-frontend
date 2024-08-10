import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllCartItems, queryClient, removeFromCart } from "../lib/api";
import { CartItem } from "../lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

function CartPage() {
  const {
    data: cartItems,
    error,
    isLoading,
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: fetchAllCartItems,
  });

  const {
    mutate: removeFromCartMutation,
    isError: isRemoveFromCartError,
    isPending: isRemoveFromCartPending,
    error: removeFromCartError,
  } = useMutation({
    mutationFn: removeFromCart,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCartItems = queryClient.getQueryData<CartItem[]>(["cart"]);

      queryClient.setQueryData<CartItem[]>(["chart"], (oldCartItems) =>
        oldCartItems?.map((cartItem) => ({
          ...cartItem,
          products: cartItem.products.filter(
            (product) => product._id !== productId
          ),
        }))
      );
      return { previousCartItems };
    },
    onError: (err, productId, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(["cart"], context.previousCartItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleRemoveFromCart(productId: string) {
    removeFromCartMutation(productId);
  }

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
                    <Button onClick={() => handleRemoveFromCart(product._id)}>
                      <Trash2 />
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
