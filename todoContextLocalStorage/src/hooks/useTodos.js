import { useReducer, useMemo, useEffect } from "react";

// Action types
const TODO_ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE_COMPLETE: "TOGGLE_COMPLETE",
};

/**
 * Reducer function for todo state management
 * @param {Array} state - Current todos state
 * @param {Object} action - Action object with type and payload
 * @returns {Array} - New todos state
 */
function todosReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return [{ id: Date.now(), ...action.payload }, ...state];

    case TODO_ACTIONS.UPDATE:
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload.todo : todo
      );

    case TODO_ACTIONS.DELETE:
      return state.filter((todo) => todo.id !== action.payload);

    case TODO_ACTIONS.TOGGLE_COMPLETE:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
}

/**
 * Get initial todos from localStorage
 * @returns {Array} Initial todos array
 */
function getInitialTodos() {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const item = window.localStorage.getItem("todos");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading todos from localStorage:", error);
    return [];
  }
}

/**
 * Custom hook for managing todos with reducer pattern
 * @returns {Object} - Todos state and actions
 */
export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, null, getInitialTodos);

  // Sync todos to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  // Memoized actions using dispatch
  const actions = useMemo(
    () => ({
      addTodo: (todo) => {
        dispatch({ type: TODO_ACTIONS.ADD, payload: todo });
      },

      updateTodo: (id, todo) => {
        dispatch({ type: TODO_ACTIONS.UPDATE, payload: { id, todo } });
      },

      deleteTodo: (id) => {
        dispatch({ type: TODO_ACTIONS.DELETE, payload: id });
      },

      toggleComplete: (id) => {
        dispatch({ type: TODO_ACTIONS.TOGGLE_COMPLETE, payload: id });
      },
    }),
    []
  );

  // Memoized computed values
  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      pending: todos.filter((todo) => !todo.completed).length,
      progress:
        todos.length > 0
          ? Math.round(
              (todos.filter((todo) => todo.completed).length / todos.length) *
                100
            )
          : 0,
    }),
    [todos]
  );

  return {
    todos,
    ...actions,
    stats,
  };
}

