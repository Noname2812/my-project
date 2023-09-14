import React, { createContext } from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
export const MyGlobalContext = createContext({
  theme: "",
});
export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  return (
    <MyGlobalContext.Provider value={{ theme: "dark" }}>
      {children}
    </MyGlobalContext.Provider>
  );
};
