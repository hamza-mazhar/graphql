import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import NavBar from "./component/Navbar";
import { routes } from "./routes";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});
const App = () => {
  let route = useRoutes(routes);
  return route;
};

const AppWrapper = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <NavBar />
        <App />
      </ApolloProvider>
    </Router>
  );
};

export default AppWrapper;
