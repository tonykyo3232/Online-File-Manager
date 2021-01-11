import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopLvFolder from "./components/TopLevFolder";
import AddFolder from "./components/AddFolder";
import AddFolderSpecLv from "./components/AddFolderSpecLv";
import SpecFolder from "./components/SpecLevFolder";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <AddFolder />
        </Route>
        <Route path="/addSpecLv/:id">
          <AddFolderSpecLv />
        </Route>
        <Route path="/SpecFolder/:id">
          <SpecFolder />
        </Route>
        <Route path="/">
          <TopLvFolder />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
