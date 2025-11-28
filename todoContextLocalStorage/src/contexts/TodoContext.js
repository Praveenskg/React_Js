import { createContext, useContext } from "react";

const TodoContext = createContext(null);

/**
 * Custom hook to access todo context
 * @throws {Error} If used outside TodoProvider
 * @returns {Object} Todo context value
 */
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = TodoContext.Provider;
