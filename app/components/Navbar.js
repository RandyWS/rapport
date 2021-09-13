import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">
          <span>Home</span>
        </Link>
      </nav>
    );
  }
}
