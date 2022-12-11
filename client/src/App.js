import React from "react";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/verify-email",
            element: <Verify />,
        }
    ]);

    return <RouterProvider router={router} />;
}
