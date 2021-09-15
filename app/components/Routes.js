import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Home from "./Home";
import Calendar from "./Calendar";
import UserPage from "./UserPage";
import { authenticate } from "../redux/loggedIn";

const Routes = () => {
  const [loggedIn, setLogIn] = useState(false);

  // This is doing a sample authenticated call
  // if this call fails, we are not logged in
  // and we can update state accordingly.
  // everytime loggedIn changes, we try this again.
  // to update the message
  useEffect(async () => {
    const { data } = await axios.get("/api/user/authenticated");
    setLogIn(data.loggedIn);
  }, [loggedIn]);

  console.log("loggedIn", loggedIn);
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} loggedIn={loggedIn} />
            <Route
              exact
              path="/user/:userName"
              component={UserPage}
              loggedIn={loggedIn}
            />
            <Route
              exact
              path="/user/:userName/calendar"
              component={Calendar}
              loggedIn={loggedIn}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(null, mapDispatchToProps)(Routes);
