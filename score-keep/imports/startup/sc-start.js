import { injectGlobal } from "styled-components";

injectGlobal`
* {
    margin: 0;
    padding: 0;
}

html {
    font-size: 62.5%;
}

body {
    background: #f2f2f2;
    color: #555555;
    font-family: Helvetica, sans-serif;
    font-size: 1.6rem;
}

input, button, select {
    font-size: 1.3rem;
}

h1 {
    font-size: 2.4rem;
    font-weight: 300;
}
`;
