import React from "react";
import BomApp from "./components/BomApp/BomApp";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={BomApp} />
      </Switch>
    </div>
  );
}

export default App;
