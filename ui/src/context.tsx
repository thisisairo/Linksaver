import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { actions } from "@/constants/actions.ts";

type User = {
  details: {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
  } | null;
  token: string | null;
};

type State = {
  user: User;
};

type Action = {
  type: string;
  payload?: any;
};

type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const initialState: State = {
  user: {
    details: null,
    token: null,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
