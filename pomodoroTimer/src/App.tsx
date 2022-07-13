import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button/Button";
import { GlobalStyle } from "./styles/global";
import { DefaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Button variant="primary" />
      <Button variant="danger" />
      <Button variant="sucess" />
      <GlobalStyle />
    </ThemeProvider>
  );
}
