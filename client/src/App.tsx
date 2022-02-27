import React from "react";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Topbar from "./components/Topbar/Topbar";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Frontpage from "./pages/Frontpage";
import Game from "./pages/Game"

//import Footer from "./components/Footer/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Topbar />
          <div className="container">
            <div>
              {/* <Nav /> */}
            </div>
            <div></div>
            <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/play" component={Game} />
            {/* <Route exact path="/profile/:username?" component={Profile} /> */}
            {/* <Route exact path="/post/:id" component={SinglePost} /> */}
            {/* <Route component={NoMatch} /> */}
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
