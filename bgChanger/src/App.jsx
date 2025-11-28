import { useState, useCallback, useMemo } from "react";

// Predefined color palette
const COLOR_PALETTE = [
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Lime", value: "#84CC16" },
  { name: "Green", value: "#22C55E" },
  { name: "Emerald", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Fuchsia", value: "#D946EF" },
  { name: "Pink", value: "#EC4899" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Slate", value: "#64748B" },
];

const App = () => {
  const [color, setColor] = useState("#FFFFFF");
  const [copied, setCopied] = useState(false);

  // Generate random color
  const generateRandomColor = useCallback(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`;
    setColor(randomColor);
  }, []);

  // Copy color to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy color:", error);
    }
  }, [color]);

  // Calculate text color based on background brightness
  const textColor = useMemo(() => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  }, [color]);

  return (
    <div
      className="w-full min-h-screen transition-all duration-500 ease-in-out flex flex-col items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ backgroundColor: color }}
    >
      {/* Main Content */}
      <div className="text-center mb-4 sm:mb-8 md:mb-12 space-y-3 sm:space-y-6 w-full max-w-6xl px-2">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 transition-colors duration-300 px-2"
          style={{ color: textColor }}
        >
          Background Changer
        </h1>
        <p
          className="text-sm sm:text-lg md:text-xl opacity-90 transition-colors duration-300 px-2"
          style={{ color: textColor }}
        >
          Click a color to change the background
        </p>

        {/* Color Display Card */}
        <div className="mt-4 sm:mt-8 md:mt-12 w-full flex justify-center px-2">
          <div
            className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20"
            style={{ color: textColor }}
          >
            <p className="text-xs sm:text-base opacity-80 mb-3 sm:mb-4 text-center">Current Color</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg sm:rounded-xl shadow-lg border-2 sm:border-4 border-white/30 transition-all duration-300 hover:scale-105 shrink-0"
                style={{ backgroundColor: color }}
              />
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold font-mono mb-2 sm:mb-3 break-all">
                  {color}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold backdrop-blur-sm touch-manipulation"
                  style={{ color: textColor }}
                >
                  {copied ? "✓ Copied!" : "Copy Color"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="w-full max-w-6xl px-2">
        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-2xl border border-white/20">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-5 md:mb-6 text-center transition-colors duration-300"
            style={{ color: textColor }}
          >
            Color Palette
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-3 md:gap-4">
            {COLOR_PALETTE.map((colorItem) => (
              <button
                key={colorItem.value}
                onClick={() => setColor(colorItem.value)}
                className="group relative aspect-square rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-xl hover:z-10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 sm:focus:ring-offset-2 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: colorItem.value }}
                title={colorItem.name}
                aria-label={`Change color to ${colorItem.name}`}
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 ${colorItem.value === color ? "opacity-100" : ""}`}
                  style={{
                    color: colorItem.value === color ? textColor : undefined,
                  }}
                >
                  {colorItem.value === color && "✓"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Picker & Random Button */}
        <div className="mt-3 sm:mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 w-full sm:w-auto">
            <label
              htmlFor="color-picker"
              className="text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap"
              style={{ color: textColor }}
            >
              Custom Color:
            </label>
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value.toUpperCase())}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg cursor-pointer border-2 border-white/30 shadow-md hover:shadow-lg active:shadow-xl transition-all duration-200 touch-manipulation shrink-0"
            />
          </div>

          <button
            onClick={generateRandomColor}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 touch-manipulation"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-sm sm:text-base">Random Color</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
