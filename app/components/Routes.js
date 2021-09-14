import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Calendar from "./Calendar";
import UserPage from "./UserPage";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userName" component={UserPage} />
            <Route exact path="/user/:userName/calendar" component={Calendar} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
