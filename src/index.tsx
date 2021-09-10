import * as React from "react";

import {
  ChakraProvider,
  ChakraTheme,
  ColorModeScript,
  extendTheme,
} from "@chakra-ui/react";
import ReactDOM from "react-dom";
import App from "./App";

const theme: ChakraTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
}) as ChakraTheme;

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
