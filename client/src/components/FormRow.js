import React from "react";

export default function FormRow({ type, name, value, placeholder, handleChange }) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{name}</label>
            <input
                type={type}
                name={name}
                value={value}
                autoComplete="off"
                className="form-input"
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}
