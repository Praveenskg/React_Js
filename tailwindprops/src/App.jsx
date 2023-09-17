import "./App.css";
import Card from "./Components/Card";
function App() {
  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">Tailwind </h1>
      <Card name="Praveen" btnText="Click Me" />
      <Card name="Pranjal" />
    </>
  );
}

export default App;
