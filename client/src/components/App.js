import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Greenhouses from "./Greenhouses";
import Zones from "./Zones";
import Plants from "./Plants";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login"; // Import your Login component
import "../styling/index.css";
import Zone from "./Zone";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    // Simulate a successful login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate a logout
    setLoggedIn(false);
  };

  const [unsortedPlants, setUnsortedPlants] = useState([])
  console.log(unsortedPlants)

  return (
    <div className="background">
      <h1 id="title"><span>the </span>Techie Gardener</h1>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />

      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>

        <Route path="/greenhouses">
          {loggedIn ? <Greenhouses /> : <Redirect to="/login" />}
        </Route>

        <Route path="/zone/:id" component={Zone} />

        <Route path="/zones">
          {loggedIn ? <Zones unsortedPlants={unsortedPlants} setUnsortedPlants={setUnsortedPlants} /> : <Redirect to="/login" />}
        </Route>

        <Route path="/plants">
          {loggedIn ? <Plants unsortedPlants={unsortedPlants} setUnsortedPlants={setUnsortedPlants} /> : <Redirect to="/login" />}
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
