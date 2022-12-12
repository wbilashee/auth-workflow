import React from "react";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import NavbarLayout from "./components/NavbarLayout";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<Verify />} />
                <Route element={<NavbarLayout />}>
                </Route>
            </Routes>
        </Router>
    )
}