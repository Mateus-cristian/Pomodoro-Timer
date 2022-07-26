import { Children, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CycleContextProvider } from "./contexts/CycleContext";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { DefaultTheme } from "./styles/themes/default";

export function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
          <GlobalStyle />
        </CycleContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
