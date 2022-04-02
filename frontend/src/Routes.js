import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/user_management/Signup";
import Signin from "./components/user_management/Signin";
import Profile from "./components/user_management/Profile";
import SearchRoom from "./components/reservations/SearchRoom";
import FetchRooms from "./components/reservations/Fetchrooms";
import BookRoom from "./components/reservations/BookRoom";
import BookFood from "./components/reservations/BookFood";
import HouseKeeping from "./components/reservations/HouseKeeping";
const Routes = () => {
  return (    
    <Router>     
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Signin} />
        <Route path="/profile" component={Profile}/>
        <Route exact path="/searchroom" component={SearchRoom} />
        <Route exact path="/fetchrooms" component={FetchRooms} />
        <Route exact path="/bookroom" component={BookRoom} />
        <Route exact path="/bookfood" component={BookFood} />
        <Route exact path="/housekeeping" component={HouseKeeping} />
        
      </Switch>      
    </Router>    
  );
};

export default Routes;
