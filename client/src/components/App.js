import React from "react";
import { Switch, Route } from "react-router-dom";
import Greenhouses from "./Greenhouses"; // Import your components
import Zones from "./Zones";
import Plants from "./Plants";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <h1>Phase 4 Project Client</h1>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <h1>we are back to the front end!! BEEYOTCH</h1>
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