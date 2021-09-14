import React, { Component } from "react";
import { connect } from "react-redux";
import UserPage from "./UserPage";
import LogIn from "./LogIn";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      message: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({
        loggedIn: this.props.loggedIn,
        message: this.props.message,
      });
    }
  }

  // This logs us out by calling the backend
  // to destroy the session
  // logout = async () => {
  //   const response = await fetch("/logout");
  //   const result = await response.json();
  //   setLoggedIn(result.loggedIn);
  //   setMessage(result.message);
  // };

  // This is doing a sample authenticated call
  // if this call fails, we are not logged in
  // and we can update state accordingly.
  // everytime loggedIn changes, we try this again.
  // to update the message
  // useEffect(() => {
  //   async function fetchAuthenticated() {
  //     const response = await fetch("/authenticated");
  //     const result = await response.json();
  //     setMessage(result.message);
  //     setLoggedIn(result.loggedIn);
  //   }
  //   fetchAuthenticated();
  // }, [loggedIn]);

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <div>
        {!loggedIn ? (
          <LogIn
            history={this.props.history}
            message={this.state.message}
          ></LogIn>
        ) : (
          <UserPage />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn.loggedIn,
    message: state.loggedIn.message,
  };
};

export default connect(mapStateToProps)(Home);
