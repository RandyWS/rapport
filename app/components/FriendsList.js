import React, { Component } from "react";

export class FriendsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const friend = this.props.friend;

    return (
      <div className="column">
        <img src={friend.imageUrl} />
        <div className="row">
          <h3>
            Name: {friend.firstName} {friend.lastName}
          </h3>
        </div>
      </div>
    );
  }
}
