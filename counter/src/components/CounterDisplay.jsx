function CounterDisplay({ count, progress, maxValue, minValue }) {
  return (
    <div className="mb-8">
      <div className="relative">
        <div className="text-center mb-4">
          <div className="inline-block bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-6 sm:p-8 shadow-inner">
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800 mb-2 transition-all duration-300">
              {count}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Current Value
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{minValue}</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
}

export default CounterDisplay;

