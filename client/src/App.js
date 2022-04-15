import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import NavBar from "./component/Navbar";
import { routes } from "./routes";
import "./App.css";

const App = () => {
  let route = useRoutes(routes);
  return route;
};

const AppWrapper = () => {
  return (
    <Router>
      <NavBar />
      <App />
    </Router>
  );
};

export default AppWrapper;
