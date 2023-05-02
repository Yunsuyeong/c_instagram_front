import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
  accent: "",
  borderColor: "",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        color:rgb(38,38,38);
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
    }
    a {
      text-decoration: none;
    }
`;
