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
      if (this._isMounted) {
        this.setState({
          loggedIn: true,
        });
      }
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
        {!loggedIn ? <LogIn></LogIn> : <UserPage />}
        <h1>{loggedIn ? "Logged In" : "Not Logged In"}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(Home);
