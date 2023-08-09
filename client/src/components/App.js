import React from "react";
import { Switch, Route } from "react-router-dom";
import Greenhouses from "./Greenhouses"; // Import your components
import Zones from "./Zones";
import Plants from "./Plants";
import NavBar from "./NavBar";
import Home from "./Home";
import '../styling/index.css';

function App() {
  return (
    <div>
      <h1 id="title">THE TECHIE GARDENER</h1>
      <NavBar />
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/greenhouses">
          <Greenhouses />
        </Route>

        <Route path="/zones">
          <Zones />
        </Route>

        <Route path="/plants">
          <Plants />
        </Route>

      </Switch>
    </div>
  );
}

export default App;