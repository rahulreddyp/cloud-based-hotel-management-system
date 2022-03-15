import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup}></Route>
        <Route exact path="/login" component={Signin}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
