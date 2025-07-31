import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/home/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import ProductDetailsPage from "./pages/product-details/ProductDetailsPage";
import AuthPageLayout from "./pages/Auth-Page/AuthPageLayout";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import CartPage from "./pages/cart-page/CartPage";
import ContactPage from "./pages/contact/ContactPage";
import BlogPage from "./pages/blog-page/BlogPage";
import About from "./pages/about-page/About";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import MainDash from "./components/DashboardSection/MainDash";
import AddProduct from "./components/DashboardSection/Products/AddProduct";
import ProductList from "./components/DashboardSection/Products/ProductList";

import Settings from "./components/DashboardSection/Settings";

import EditProduct from "./components/DashboardSection/Products/EditProduct";
import OrderList from "./components/DashboardSection/Orders/OrderList";
import Profile from "./components/DashboardSection/Profile/Profile";
import OrderDetails from "./components/DashboardSection/Orders/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "./features/user/userApi";
import { setUser } from "./features/user/userSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import FavouritePage from "./pages/favourite-page/FavouritePage";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage";
import NotFoundPage from "./components/not-found/NotFoundPage";

export default function App() {
  const { data, isLoading, isFetching } = useGetMeQuery();

  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "shop",
          element: <ShopPage />,
        },
        {
          path: "product-details/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "auth-page",
          element: user ? <Navigate to="/" /> : <AuthPageLayout />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "order-confirmation/:id",
          element: <OrderConfirmationPage />,
        },
        {
          path: "cart-page",
          element: <CartPage />,
        },
        {
          path: "contact-page",
          element: <ContactPage />,
        },
        {
          path: "blog-page",
          element: <BlogPage />,
        },
        {
          path: "about",
          element: <About />,
        },
        { path: "favourites", element: <FavouritePage /> },
        {
          path: "dashboard",

          element: data || user ? <DashboardPage /> : <Navigate to="/" />,
          children: [
            {
              index: true,
              element: <MainDash />,
            },
            {
              path: "add-product",
              element: <AddProduct />,
            },
            {
              path: "product-list",
              element: <ProductList />,
            },
            {
              path: "edit-product/:id",
              element: <EditProduct />,
            },
            {
              path: "order-list",
              element: <OrderList />,
            },
            {
              path: "order-details/:id",
              element: <OrderDetails />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
