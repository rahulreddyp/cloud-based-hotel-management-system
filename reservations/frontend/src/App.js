import './App.css';
import SearchRoom from "./Components/SearchRoom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fetchrooms from './Components/Fetchrooms';


function App() {
 
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={SearchRoom} />
        <Route exact path="/Fetchrooms" component={Fetchrooms} />
        <SearchRoom />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
