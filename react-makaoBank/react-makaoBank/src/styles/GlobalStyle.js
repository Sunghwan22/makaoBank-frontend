import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}

*{
 box-sizing: border-box;
}

body {
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.homeText};
}

 a {
   color : ${(props) => props.theme.colors.text};
   text-decoration: none;
 }
`;

export default GlobalStyle;
