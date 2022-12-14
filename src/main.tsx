import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
