import styled from "styled-components";

const Button = styled.button`
    background: transparent;
    border: 1px solid #555555;
    color: #555555;
    cursor: pointer;
    font-weight: 600;
    line-height: 1;
    margin-left: 1.3rem;
    outline: none;
    padding: 1.3rem;
    -webkit-transition: background 0.2s ease, transform 0.2s ease;
    -moz-transition: background 0.2s ease, transform 0.2s ease;
    -o-transition: background 0.2s ease, transform 0.2s ease;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover,
    &:focus {
        background: #e8e8e8;
    }

    &:active {
        background: #cccccc;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

export default Button;
