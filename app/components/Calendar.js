import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { resetContacts, getContacts } from "../redux/contacts";
import { fetchUser } from "../redux/user";
import { connect } from "react-redux";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      contacts: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userName);
  }

  componentWillUnmount() {
    this.props.resetContacts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      this.setState({
        contacts: this.props.contacts,
      });
    }

    if (prevProps.user !== this.props.user) {
      if (this.props.user.id) {
        this.props.getContacts(this.props.user.id);
      }

      this.setState({
        user: this.props.user,
      });
    }
  }

  render() {
    const events = [...this.state.contacts];

    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={this.state.contacts}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: (userId) => dispatch(getContacts(userId)),
    resetContacts: () => dispatch(resetContacts()),
    fetchUser: (username) => dispatch(fetchUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
