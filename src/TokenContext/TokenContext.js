import React, { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(
    localStorage.getItem("token")) || "",
  );

  if (token) {
    localStorage.setItem("token", JSON.stringify(token));
  } else {
    localStorage.removeItem("token");
  }

  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  );
};
