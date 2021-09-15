import React, { Component } from "react";
import { connect } from "react-redux";
import { createContact } from "../redux/singleContact";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewContact extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: "",
      content: "",
      errors: {
        title: "",
        date: "",
        content: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // front-end error handling
    const { name, value } = event.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid name, address, and imageUrl
    switch (name) {
      // first two check if the first/last name is empty
      case "title":
        errors.title = !value.length ? "Please provide a title" : "";
        break;
      default:
        break;
    }

    // sets the copy of the error state we made with the changes we implemented through switch on the state

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleDate(date) {
    this.setState({
      date: date,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.createContact({ ...this.state });
  }

  render() {
    // type checks for errors in initial rendering
    const {
      title,
      date,
      content,

      errors,
    } = this.state;
    const { handleSubmit } = this;
    console.log(date);

    return (
      <form id="sign-up-form" onSubmit={handleSubmit}>
        {errors.title ? <h3 className="error">{errors.title}</h3> : null}
        <label htmlFor="contact-title">Title:</label>
        <input
          name="title"
          value={title}
          onChange={this.handleChange}
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.content ? <h3 className="error">{errors.content}</h3> : null}
        <label htmlFor="content">Content:</label>
        <input
          name="content"
          value={content}
          onChange={this.handleChange}
          style={{
            border: errors.lastName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.date ? <h3 className="error">{errors.date}</h3> : null}
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={date}
          // onSelect={this.handleDate}
          onChange={this.handleDate} //only when value has changed
        />

        <button type="submit">Submit New User</button>
        <Link className="link" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createContact: (user) => dispatch(createContact(user, history)),
  };
};

export default connect(null, mapDispatchToProps)(NewContact);
