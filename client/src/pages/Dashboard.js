import React, { useState } from "react";
import axios from "axios";
import url from "../utils/url";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import useLocalState from "../utils/localState";

export default function Dashboard() {
    const { user } = useGlobalContext();
    const { userId, name, role } = user;
    const [users, setUsers] = useState([]);
    const {
        alert,
        showAlert,
        loading,
        setLoading,
        hideAlert
    } = useLocalState();

    const showAllUsers = async () => {
        hideAlert();
        setLoading(true);
        try {
            const { data } = await axios.get(`${url}/api/v1/user/all`);
            showAlert({
                text: `${data.msg}`,
                type: "success",
            });
            setUsers(data.users);
            setLoading(false);
            setTimeout(() => {
                hideAlert();
            }, 3000);
        } catch (error) {
            showAlert({ text: error.response.data.msg });
            setLoading(false);
        }
    }

    return (
        <Wrapper className="page">
            <div className="user">
                <h2>Hello there, {name}</h2>
                <p>
                    Your ID : <span>{userId}</span>
                </p>
                <p>
                    Your Role : <span>{role}</span>
                </p>
            </div>
            {user.role === "admin" && (
                <>
                    <button
                        className="btn"
                        onClick={showAllUsers}
                    >Get all users</button>
                    {alert.show && (
                        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
                    )}
                    {loading ? <Loading /> : ""}
                    {users && <article className="users">
                        {users.map(user => <div key={user._id} className="user-div">
                            <p>ID: <span>{user._id}</span></p>
                            <p>Name: <span>{user.name}</span></p>
                            <p>Role:  <span>{user.role}</span></p>
                        </div>)}
                    </article>}
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .user {
        margin: auto;
        text-align: left;
        width: var(--fluid-width);
        max-width: var(--fixed-width);
    }
    h2 {
        font-size: 1.15rem;
        margin-bottom: 1rem;
        @media only screen and (min-width: 640px) {
            font-size: 1.5rem;
        }
    }
    p span {
        color: var(--white);
        border-radius: 0.15rem;
        padding: 0.15rem 0.25rem;
        background: var(--green);
    }
    .alert,
    .loading {
        margin: 2rem auto;
    }
    .users {
        display: grid;
        gap: 2rem 4rem;
        margin: 1rem auto;
        grid-template-columns: 1fr;
        @media only screen and (min-width: 640px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media only screen and (min-width: 992px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .users div {
        padding: 1.25rem;
        text-align: left;
        border-radius: 0.25rem;
        border: 1px solid var(--green);
    }
    .users div p:last-child {
        margin: 0;
    }
`;