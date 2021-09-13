import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import UserPage from "./UserPage";
import Calendar from "./Calendar";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={UserPage} />
            <Route exact path="/calendar" component={Calendar} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
