import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopLvFolder from "./components/TopLevFolder";
import SpecFolder from "./components/SpecLevFolder";
import HomePage from "./components/HomePage";
import Image from "./components/ShowImage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/image/:id">
          <Image />
        </Route>
        <Route path="/SpecFolder/:id">
          <SpecFolder />
        </Route>
        <Route path="/topLv">
          <TopLvFolder />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
