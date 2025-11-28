import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const inputRef = useRef(null);

  // Sync local state with prop changes
  useEffect(() => {
    setTodoMsg(todo.todo);
  }, [todo.todo]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isTodoEditable && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isTodoEditable]);

  const handleEdit = useCallback(() => {
    if (todoMsg.trim() && todoMsg !== todo.todo) {
      updateTodo(todo.id, { ...todo, todo: todoMsg.trim() });
    } else {
      setTodoMsg(todo.todo);
    }
    setIsTodoEditable(false);
  }, [todoMsg, todo, updateTodo]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleEdit();
      } else if (e.key === "Escape") {
        setTodoMsg(todo.todo);
        setIsTodoEditable(false);
      }
    },
    [handleEdit, todo.todo]
  );

  const handleToggleComplete = useCallback(() => {
    toggleComplete(todo.id);
  }, [todo.id, toggleComplete]);

  const handleDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id, deleteTodo]);

  const handleEditClick = useCallback(() => {
    if (todo.completed) return;
    if (isTodoEditable) {
      handleEdit();
    } else {
      setIsTodoEditable(true);
    }
  }, [todo.completed, isTodoEditable, handleEdit]);

  // Memoized className for card
  const cardClassName = useMemo(
    () =>
      `group bg-white rounded-xl shadow-md hover:shadow-lg border transition-all duration-300 ${todo.completed
        ? "border-green-200"
        : "border-gray-200 hover:border-indigo-300"
      }`,
    [todo.completed]
  );

  return (
    <div className={cardClassName}>
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="shrink-0 pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={todo.completed}
                onChange={handleToggleComplete}
              />
              <div className="w-6 h-6 bg-gray-200 peer-checked:bg-green-500 peer-checked:border-green-500 border-2 border-gray-300 rounded-md transition-all duration-200 peer-focus:ring-2 peer-focus:ring-green-500 peer-focus:ring-offset-2 flex items-center justify-center">
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>

          {/* Todo Text Input */}
          <div className="flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              className={`w-full bg-transparent text-gray-900 outline-none transition-all duration-200 ${isTodoEditable
                  ? "bg-white border-2 border-indigo-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                  : "border-transparent"
                } ${todo.completed
                  ? "line-through text-gray-500"
                  : ""
                }`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              aria-label={isTodoEditable ? "Edit todo" : "Todo text"}
              readOnly={!isTodoEditable}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Edit/Save Button */}
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${todo.completed
                  ? "opacity-50 cursor-not-allowed"
                  : isTodoEditable
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                }`}
              onClick={handleEditClick}
              disabled={todo.completed}
              title={isTodoEditable ? "Save changes" : "Edit task"}
            >
              {isTodoEditable ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              )}
            </button>

            {/* Delete Button */}
            <button
              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110"
              onClick={handleDelete}
              title="Delete task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
