import React, { Component } from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  UserName: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

export class SignUp extends Component {
  state = initialState;

  // function that allows for the changes of the inputs
  // updates the state
  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      // if it is a checkbox get checked otherwise get valued event
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    // Checking if name has been filled if not add this string to name error
    if (!this.state.name) {
      nameError = "Name cannot be blank";
    }

    // Checking if email form input include and @ if not add this string to name error
    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    // Checking if password has been filled if not add this string to name error
    if (!this.state.password) {
      passwordError = "Password cannot be blank";
    }

    // returns false if there is a value for these objects and changes the state to the variables
    if (emailError || nameError || passwordError) {
      this.setState({ emailError, nameError, passwordError });
      return false;
    }

    // if all this is fine continue
    return true;
  };

  // prevents form from being submitted or refreshed
  handleSubmit = (event) => {
    event.preventDefault();
    // on submit checks if there are any errors
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear the form
      // sets back to the initial state when user gets all input correct
      this.setState(initialState);
    }
    // contains the data I want to send to my server
    const payload = {
      name: this.state.name,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      password: this.state.password,
      comment: this.state.comment,
    };

    axios({
      url: "/api/user/register", // Sends the data to this endpoint to process the data needed to
      //   create a proxy to get both servers on the same origin
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server"); // Server was able to process the data
      })
      .catch(() => {
        console.log("Internal server error"); // The data was not able to reach the server
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='ca__contact'>
          <h3 className='ca__title'>
            PLEASE FILL OUT ALL NECESSARY INFORMATION TO CREATE AN ACCOUNT
          </h3>
          <label>
            Full Name:
            <div className='error'>{this.state.nameError}</div>
            <input
              type='text'
              name='name'
              id='ca__fname'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <div className='error'>{this.state.emailError}</div>
            <input
              type='email'
              name='email'
              id='ca__email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            UserName:
            <input
              type='text'
              name='UserName'
              id='ca__username'
              value={this.state.UserName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <div className='error'>{this.state.passwordError}</div>
            <input
              type='text'
              name='password'
              id='ca__password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='Create Account' />
        </div>
      </form>
    );
  }
}

export default SignUp;
