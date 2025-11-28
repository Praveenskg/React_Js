import { TodoProvider } from "./contexts/TodoContext";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import "./index.css";

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, stats } =
    useTodos();

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, stats }}
    >
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Todo Manager
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Stay organized and boost your productivity
            </p>
          </div>

          {/* Stats Card */}
          {stats.total > 0 && (
            <div className="mb-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                    <p className="text-xs text-gray-500">Total Tasks</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.completed}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {stats.pending}
                    </p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    {stats.progress}%
                  </p>
                  <p className="text-xs text-gray-500">Progress</p>
                </div>
              </div>
            </div>
          )}

          {/* Todo Form Card */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <TodoForm />
          </div>

          {/* Todos List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No todos yet
                </h3>
                <p className="text-gray-500">Add your first task to get started!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
