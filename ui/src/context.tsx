import { createContext, useReducer, useContext } from "react";
import * as React from "react";

const initialState = {};

const AppContext = createContext(initialState);

const reducer = (state: any, action: { type: string }) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
