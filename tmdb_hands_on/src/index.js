import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://tmdb-server-dev.logicwind.co/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();


// Login page  : bredcurm Hide / change err notification
// home page  : bredcurm changes
// MOVIEform : true/false = radio button / ADD MOVIE PRIV. DATA NOT CLEAR / ADD MULTIPAL IMAGE UPLOAD / ADD filters and sort


// outer scroll stop
// Bredcrum
// place Holder
// Edit form button Name change
// width increse for menu
// filter loading set
// No data Senario in movie List.
// stop refetch form wtihout form save
// validate msg and Input Placeholder