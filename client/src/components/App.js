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
    <div className="background">
      <h1 id="title"><span>the </span>Techie Gardener</h1>
      <NavBar />
      
      <Switch>
        <Route exact path="/home">
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