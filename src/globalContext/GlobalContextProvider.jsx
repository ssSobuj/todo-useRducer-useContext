/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import { todoReducer } from "../reducer";

export const globalContext = createContext();

const INITIAL_STATE = {
  todos: [],
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    todoReducer,
    JSON.parse(localStorage.getItem("state")) || INITIAL_STATE
  );

  useEffect(() => {
    state && localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
}
