import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import NavbarLayout from "./components/NavbarLayout";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/verify-email" element={<Verify />} />
                <Route element={<NavbarLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                </Route>
            </Routes>
        </Router>
    )
}