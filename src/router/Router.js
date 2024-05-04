import Main from "../layout/Main.js";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home.js";
import Menu from "../pages/shop/Menu.js";
import SignUp from "../components/SignUp.js";
import PrivateRouter from "../layout/PrivateRouter/PrivateRouter.js";
import UpdateProfile from "../pages/dashboard/UpdateProfile.js";
import Cart from "../pages/shop/Cart.js";
import Dashboard from "../pages/dashboard/admin/Dashboard.js";
import DashboardLayout from "../layout/DashboardLayout.js";
import Users from "../pages/dashboard/admin/Users.js";
import AddMenu from "../pages/dashboard/admin/AddMenu.js";
import ManageItems from "../pages/dashboard/admin/ManageItems.js";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu.js";
import Payment from "../pages/shop/Payment.js";
import Order from "../pages/dashboard/Order.jsx";
import SingleProductPage from "../components/SingleProductPage.js";
import Search from "../pages/search/Search.js";
import Settings from "../pages/dashboard/settings/Settings.jsx";
import About from "../pages/about/About.js";
import Privacy from "../pages/privacy/Privacy.js";
import Contact from "../pages/contact/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
     
      {
        path: "//privacy-term",
        element: <Privacy />,
      },

      {
        path: "/product-page/:id", // Removed the leading slash
        element: <SingleProductPage />,
      },

      {
        path: "/orders",
        element: (
          <PrivateRouter>
            <Order />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        
        path: "/cart-page",
        element: <Cart />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
      {
        path: "/search", // Define the path for the search page
        element: <Search />,
        loader: ({ query }) =>
          fetch(`http://localhost:3001/menu/search${query}`),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "",
  },

  // admin
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:3001/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
