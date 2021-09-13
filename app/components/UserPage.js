import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, setUser } from "../redux/user";
import { User } from "./user";
import { FriendsList } from "./FriendsList";
import LogIn from "./LogIn";

class UserPage extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
      friends: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.props.fetchUser().then(() => {
      if (this._isMounted) {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.clearStudent();
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (this._isMounted) {
        this.setState({
          user: this.props.user,
          friends: this.props.user.friends,
        });
      }
    }
  }

  render() {
    const user = this.state.user || {};
    const friends = this.state.friends || [];

    return (
      <div>
        <User user={this.state.user} friends={this.state.friends} />
        {!friends.length ? (
          <h4>You have no friends!</h4>
        ) : (
          friends.map((friend) => (
            <FriendsList friend={friend} key={friend.id} />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser(1)),
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
