import React from "react";
import loader from "../assets/loader.gif";

export default function Loading() {
    return (
        <div className="loading">
            <img src={loader} alt="loader" />
        </div>
    )
}
