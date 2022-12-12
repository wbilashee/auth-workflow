import React from "react";
import styled from "styled-components";
import mailbox from "../assets/mailbox.svg";
import { useGlobalContext } from "../context";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
    const { user } = useGlobalContext();

    if (user) {
        return <Navigate replace to="/dashboard" />
    }

    return (
        <Wrapper className="page">
            <div className="info">
                <h2>
                    <span>Auth </span>
                    Workflow
                </h2>
                <p>
                    Authentication is the act of proving an assertion, such as the identity of a computer system user. In contrast with identification, the act of indicating a person or thing"s identity, authentication is the process of verifying that identity.
                </p>
                <p>
                    User authentication is a process that allows a device to verify the identify of someone who connects to a network resource. There are many technologies currently available to a network administrator to authenticate users.
                </p>
                <Link to="/login" className="btn">
                    Login
                </Link>
                <Link to="/register" className="btn">
                    Register
                </Link>
            </div>
            <div className="main-img">
                <img src={mailbox} alt="mailbox" className="img" />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    display: grid;
    align-items: center;
    h2 {
        color: var(--blue);
        font-weight: 700;
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
    }
    h2 span {
        color: var(--green);
    }
    .main-img {
        display: none;
    }
    .btn {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }  
    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 6rem;
        .main-img {
          display: block;
        }
    }
`;