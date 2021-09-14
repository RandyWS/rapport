import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, setUser } from "../redux/user";
import User from "./user";
import { FriendsList } from "./FriendsList";

class UserPage extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      user: {},
      userFriends: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.props.clearUser();
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this._isMounted) {
      if (prevProps.user !== this.props.user) {
        this.setState({
          user: this.props.user,
        });
      }
      if (prevProps.userFriends !== this.props.userFriends) {
        this.setState({
          userFriends: this.props.userFriends,
        });
      }
    }
  }

  render() {
    const user = { ...this.props.user } || {};
    const friends = this.state.userFriends || [];

    return (
      <div>
        <div>{user.id ? <User user={user} /> : null}</div>
        {!friends.length ? (
          <h4>You have no friends!</h4>
        ) : (
          ((<h3>Rapport with {friends.length} friends!</h3>),
          friends.map((friend) => (
            <FriendsList friend={friend} key={friend.id} />
          )))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userFriends: state.userFriends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
