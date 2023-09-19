import React, { useState } from "react";

const App = () => {
  const [color, setColor] = useState("");
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap  justify-center bottom-12 inset-x-0  px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button
            className="outline-none px-4 py-1 rounded-full  bg-red-600"
            onClick={() => setColor("Red")}
          >
            Red
          </button>
          <button
            onClick={() => setColor("Green")}
            className="outline-none px-4 py-1 rounded-full  bg-green-600"
          >
            Green
          </button>
          <button
            onClick={() => setColor("Yellow")}
            className="outline-none px-4 py-1 rounded-full  bg-yellow-600"
          >
            Yellow
          </button>
          <button
            onClick={() => setColor("Blue")}
            className="outline-none px-4 py-1 rounded-full  bg-blue-600"
          >
            blue
          </button>
          <button
            onClick={() => setColor("Orange")}
            className="outline-none px-4 py-1 rounded-full  bg-orange-600"
          >
            Orange
          </button>
          <button
            onClick={() => setColor("violet")}
            className="outline-none px-4 py-1 rounded-full  bg-violet-600"
          >
            Violet
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
