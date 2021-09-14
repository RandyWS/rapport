import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { _logOut } from "../redux/loggedIn";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: this.props.loggedIn.loggedIn });
    }
  }

  logOut(ev) {
    ev.preventDefault();
    this.props.logOut();
  }

  render() {
    return (
      <nav>
        <Link to="/">
          <span>Home</span>
        </Link>
        {this.state.loggedIn ? (
          <button onClick={this.logOut}>Logout</button>
        ) : (
          <Link to="/">
            <span>LogIn</span>
          </Link>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(_logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
