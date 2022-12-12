import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Navbar() {
    const { user, logoutUser } = useGlobalContext();

    return (
        <Wrapper>
            <div className="nav-center">
                <Link to="/">
                    <h3 className="logo">
                        <span>Auth </span>
                        Workflow
                    </h3>
                </Link>
                {user && (<div className="nav-text">
                    <p>Hello,  {user.name.split(" ")[0]}</p>
                    <button className="btn btn-small"
                        onClick={() => logoutUser()}>
                        logout
                    </button>
                </div>)}


                <div className="nav-text">
                    <p>Hello, Elen Emily</p>
                    <button className="btn"
                        onClick={() => logoutUser()}>
                        logout
                    </button>
                </div>


            </div>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--white);
    .nav-center {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: var(--fluid-width);
        max-width: var(--max-width);
        justify-content: space-between;
    }
    .logo {
        color: var(--blue);
    }
    .logo span {
        color: var(--green);
    }
    .nav-text {
        display: flex;
    }
    .nav-text p {
        display: none;
        text-transform: capitalize;
    }
    @media (min-width: 776px)  {
        .nav-text p  {
            margin: 0;
            display: block;
            margin-right: 1rem;
        }
    }
`;