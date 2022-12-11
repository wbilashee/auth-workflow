import React from "react";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
    const router = createBrowserRouter([
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
