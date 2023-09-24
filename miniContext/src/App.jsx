import UserContextProvider from "./Context/UserContextProvider";
import "./App.css";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

function App() {


  return <UserContextProvider>

    <Login />
    <Profile/>
  </UserContextProvider>;
}

export default App;
