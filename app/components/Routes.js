import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { UserContext } from "./hooks/UserContext";
import Landing from "./Landing";
import Calendar from "./Calendar";
import UserPage from "./UserPage";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import SingleCommunication from "./SingleCommunication";
import AddFriend from "./AddFriend";
import PrivateRoute from "./PrivateRoute";
import NewCommunication from "./NewCommunication";
import { authenticate } from "../redux/loggedIn";
import { setIsLoading } from "../redux/isLoading";
import { _fetchUser } from "../redux/user";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.props.fetchUser().then(() => {
      this.setState({ isLoading: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user });
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        <main>
          <UserContext.Provider value={this.state}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute
                path="/home"
                component={UserPage}
                user={this.state.user}
                isLoading={this.state.isLoading}
              />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/addMessage" component={NewCommunication} />
              <Route exact path="/addFriend" component={AddFriend} />
              <Route
                exact
                path="/calendar/:contactId"
                component={SingleCommunication}
              />
            </Switch>
          </UserContext.Provider>
        </main>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
    fetchUser: (username) => dispatch(_fetchUser(username, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
