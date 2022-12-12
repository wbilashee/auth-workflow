import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import { useGlobalContext } from "./context";
import PrivateRoute from "./pages/PrivateRoute";
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
                <Route element={<NavbarLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard"
                        element={<PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>}
                    />
                </Route>
            </Routes>
        </Router>
    )
}