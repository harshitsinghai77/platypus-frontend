import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Editor from "./views/simpleText.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Editor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
