import "./App.css";
import SearchRoom from "./Components/SearchRoom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FetchRooms from "./Components/FetchRooms";
import BookRoom from "./Components/BookRoom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={SearchRoom} />
          <Route exact path="/fetchrooms" component={FetchRooms} />
          <Route exact path="/bookroom" component={BookRoom} />
          <SearchRoom />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
