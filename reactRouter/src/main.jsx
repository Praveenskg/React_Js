import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import User from "./Components/User.jsx";
import Github, { githubLoader } from "./Components/Github.jsx";
import { Error } from "./Components/Error.jsx";

// First Method

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       }, {
//         path: 'about',
//         element: <About/>
//       },
//       {
//         path: "contact",
//         element : <Contact/>
//       }
//     ],
//   },
// ]);

// Second Method Of Routing

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<Error />} />
      <Route path="user/:userid" element={<User />} />
      <Route path="github" element={<Github />} loader={githubLoader} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
