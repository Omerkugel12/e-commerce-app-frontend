import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function NavBar() {
  const { loggedInUser } = useAuth();
  return (
    <nav className="flex justify-between p-4">
      <NavLink to="/">Home</NavLink>
      <ul className="flex gap-2">
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>

        {!loggedInUser && (
          <>
            <li>
              <NavLink to="/auth/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/auth/register">Register</NavLink>
            </li>
          </>
        )}
        {loggedInUser && (
          <>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{loggedInUser.username}</AvatarFallback>
              </Avatar>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
