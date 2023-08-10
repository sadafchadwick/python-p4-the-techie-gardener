import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Greenhouses from "./Greenhouses";
import Zones from "./Zones";
import Plants from "./Plants";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login"; // Import your Login component
import "../styling/index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState();

  const handleLogin = () => {
    // Simulate a successful login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate a logout
    setLoggedIn(false);
  };

  return (
    <div>
      <h1 id="title">THE TECHIE GARDENER</h1>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/greenhouses">
          {loggedIn ? <Greenhouses /> : <Redirect to="/login" />}
        </Route>

        <Route path="/zones">
          {loggedIn ? <Zones /> : <Redirect to="/login" />}
        </Route>

        <Route path="/plants">
          {loggedIn ? <Plants /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
