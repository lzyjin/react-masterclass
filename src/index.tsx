import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from "recoil";
import {darkTheme, lightTheme} from "./theme";
import {ThemeProvider} from "styled-components";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={ darkTheme }>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);