import React, { Component } from "react";

export default class User extends Component {
  constructor() {
    super();
  }

  render() {
    const user = this.props.user;

    return (
      <div className="column">
        <img src={user.imageUrl} />
        <div className="row">
          <h2>Username: {user.userName}</h2>
          <h3>
            Name: {user.firstName} {user.lastName}
          </h3>
          <h3>Email: {user.email}</h3>
        </div>
      </div>
    );
  }
}
