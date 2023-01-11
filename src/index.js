import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import { TokenContextProvider } from "./TokenContext/TokenContext";
import { UserContextProvider } from "./UserContext/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <TokenContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TokenContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
);
