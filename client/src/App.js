import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import { useGlobalContext } from "./context";
import PrivateRoute from "./pages/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NavbarLayout from "./components/NavbarLayout";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

export default function App() {
    const { isLoading } = useGlobalContext();

    if (isLoading) {
        return <section className="page-center">
            <Loading />
        </section>
    }

    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/verify-email" element={<Verify />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route element={<NavbarLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard"
                        element={<PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>}
                    />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}