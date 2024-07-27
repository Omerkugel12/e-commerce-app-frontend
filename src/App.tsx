import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import AuthLayout from "./pages/layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { loggedInUser } = useAuth();

  function ProtectedLoggedOutRoute({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // in real world, loggedInUser will consume from AuthContext
    if (loggedInUser === null) {
      return <Navigate to="/auth/login" />;
    }

    return children;
  }

  function ProtectedLoggedInRoute({ children }: { children: React.ReactNode }) {
    // in real world, loggedInUser will consume from AuthContext
    if (loggedInUser) {
      return <Navigate to="/product" />;
    }

    return children;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product">
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route
          path="/cart"
          element={
            <ProtectedLoggedOutRoute>
              <CartPage />
            </ProtectedLoggedOutRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <ProtectedLoggedInRoute>
              <AuthLayout />
            </ProtectedLoggedInRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
