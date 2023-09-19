import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const addValue = () => {
    if (count < 20) {
      setCount(count + 1);
    }
  };

  const removeValue = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <h1>React Counter </h1>
      <h2>Counter value : {count}</h2>
      <button onClick={addValue}>Add Value</button>

      <button onClick={removeValue}>Remove Value</button>
    </>
  );
}

export default App;
