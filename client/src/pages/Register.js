import React, { useState } from "react";
import axios from "axios";
import url from "../utils/url";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useGlobalContext } from "../context";
import useLocalState from "../utils/localState";

export default function Register() {
    const { saveUser } = useGlobalContext();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {
        alert,
        showAlert,
        loading,
        setLoading,
        success,
        setSuccess,
        hideAlert,
    } = useLocalState();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        setLoading(true);
        const { name, email, password } = values;
        const newUser = { name, email, password };

        try {
            const { data } = await axios.post(`${url}/api/v1/auth/register`, newUser, { withCredentials: true });
            setSuccess(true);
            setValues({ name: "", email: "", password: "" });
            showAlert({ text: data.msg, type: "success" });
            saveUser(data.user);
        } catch (error) {
            const { msg } = error.response.data;
            showAlert({ text: msg || "there was an error" });
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <Wrapper>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}
            {!success && (
                <form className={loading ? "form form-loading" : "form"} onSubmit={handleSubmit}>
                    <FormRow
                        type="name"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                        placeholder="Enter your name..."
                    />
                    <FormRow
                        type="email"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        placeholder="Enter your email..."
                    />
                    <FormRow
                        type="password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        placeholder="Enter your password..."
                    />
                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? "Loading..." : "Register"}
                    </button>
                    <p>
                        Already a have an account?
                        <Link to="/login" className="login-link">
                            Log In
                        </Link>
                    </p>
                </form>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .alert {
        margin-top: 3rem;
        margin-bottom: -1.5rem;
    }
    h4 {
        text-align: center;
    }
    p {
        margin-top: 1rem;
        margin-bottom: 0;
        text-align: center;
    }
    .login-link {
        cursor: pointer;
        color: var(--green);
        margin-left: 0.25rem;
        display: inline-block;
        text-transform: capitalize;
    }
`;