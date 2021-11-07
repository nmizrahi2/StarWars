import {css} from 'styled-components';

export default css`

  *:not(text),
  *:after,
  *:before {
    box-sizing: border-box;
    font: inherit;
    font-size: 1em;
    outline: none;
  }

  html {
    font-size: 8px;
    font-family: Arial, Helvetica, sans-serif;
  }

  html,
  body {
    height: 100vh;
  }

  body {
    font-size: 2rem;
    -webkit-font-smoothing: antialiased;
  }

  body,
  ul,
  ol,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style-type: none;
  }

  svg {
    display: block;
  }

  #app {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;
