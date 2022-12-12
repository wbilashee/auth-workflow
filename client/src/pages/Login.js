import React, { useState } from "react";
import axios from "axios";
import url from "../utils/url";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { useGlobalContext } from "../context";
import useLocalState from "../utils/localState";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { saveUser } = useGlobalContext();

    const [values, setValues] = useState({
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
        const { email, password } = values;
        const user = { email, password };

        try {
            const { data } = await axios.post(`${url}/api/v1/auth/login`, user, { withCredentials: true });
            setSuccess(true);
            setValues({ email: "", password: "" });
            showAlert({ text: data.msg, type: "success" });
            saveUser(data.user);
            navigate("/dashboard");
        } catch (error) {
            const { msg } = error.response.data;
            showAlert({ text: msg || "There was an error" });
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Wrapper>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}
            {!success && (
                <form className={loading ? "form form-loading" : "form"} onSubmit={handleSubmit}>
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
                        {loading ? "Loading..." : "Log In"}
                    </button>
                    <p>
                        Don't have any account?
                        <Link to="/register" className="link">
                            Register
                        </Link>
                    </p>
                    <p>
                        Forgot your password?
                        <Link to="/forgot-password" className="link">
                            Reset Password
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
    p {
        margin: 0 0 0.5rem;
        text-align: center;
    }
    .btn {
        margin-bottom: 1.25rem;
    }
`;