import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/user_management/Signup";
import Signin from "./components/user_management/Signin";
import Profile from "./components/user_management/Profile";
import SearchRoom from "./components/reservations/SearchRoom";
import FetchRooms from "./components/reservations/Fetchrooms";
import BookRoom from "./components/reservations/BookRoom";
import BookFood from "./components/orderfood/BookFood";
import HouseKeeping from "./components/housekeeping/HouseKeeping";
import Page from "./components/Page"

const Routes = () => {
  return (  
    <div style={{width:"60%",margin:"auto"}}>  
    <Router> 
  <Page/>
      <Switch>
      {/* <Page>  */}
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Signin} />
        <Route path="/profile" component={Profile}/>
        <Route exact path="/searchroom" component={SearchRoom} />
        <Route exact path="/fetchrooms" component={FetchRooms} />
        <Route exact path="/bookroom" component={BookRoom} />
        <Route exact path="/bookfood" component={BookFood} />
        <Route exact path="/housekeeping" component={HouseKeeping} />
        {/* </Page>  */}
      </Switch>  
    </Router> 
  </div>

  );
};

export default Routes;
