import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <Wrapper className="page">
            <h1>Oops!</h1>
            <h2>404 - Page Not Found</h2>
            <Link to="/" className="btn">Back Home</Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    h1 {
        font-size: 3rem;
        color: var(--green);
    }
`;