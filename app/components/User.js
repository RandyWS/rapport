import React, { Component } from "react";

export class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    const user = this.props.user;
    const friends = this.props.friends;

    return (
      <div className="column">
        <img src={user.imageUrl} />
        <div className="row">
          <h2>Username: {user.userName}</h2>
          <h3>
            Name: {user.firstName} {user.lastName}
          </h3>
          <h3>Email: {user.email}</h3>
          <h3>Rapport with {friends.length} friends!</h3>
        </div>
      </div>
    );
  }
}
