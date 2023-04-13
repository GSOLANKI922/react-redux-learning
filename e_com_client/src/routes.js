import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/singup", element: <Singup /> },
    { path: "/product/:pid", element: <Product /> },
    { path: "/cart", element: <Cart /> },

];
