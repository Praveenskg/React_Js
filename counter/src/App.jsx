import { useState, useCallback, useMemo } from "react";
import CounterDisplay from "./components/CounterDisplay";
import ActionButtons from "./components/ActionButtons";
import StatusMessage from "./components/StatusMessage";

const MAX_VALUE = 20;
const MIN_VALUE = 0;

function App() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => (prev < MAX_VALUE ? prev + 1 : prev));
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => (prev > MIN_VALUE ? prev - 1 : prev));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const isMaxReached = useMemo(() => count >= MAX_VALUE, [count]);
  const isMinReached = useMemo(() => count <= MIN_VALUE, [count]);
  const progress = useMemo(() => (count / MAX_VALUE) * 100, [count]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              React Counter
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Count from {MIN_VALUE} to {MAX_VALUE}
            </p>
          </div>

          {/* Counter Display */}
          <CounterDisplay
            count={count}
            progress={progress}
            maxValue={MAX_VALUE}
            minValue={MIN_VALUE}
          />

          {/* Action Buttons */}
          <ActionButtons
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
            isMaxReached={isMaxReached}
            isMinReached={isMinReached}
            count={count}
          />

          {/* Status Messages */}
          <StatusMessage
            isMaxReached={isMaxReached}
            isMinReached={isMinReached}
            count={count}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Click buttons to increment or decrement the counter
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
