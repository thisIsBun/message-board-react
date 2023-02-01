import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    red_300: "#F84527",
    red_400: "#D53B21",
    red_500: "#BE3B4C",
  },
};

ReactDom.render(
  <ThemeProvider theme={theme} >
    <App />
  </ThemeProvider>,
  document.getElementById("root")
); //執行的時候，把 App component render到 root位置