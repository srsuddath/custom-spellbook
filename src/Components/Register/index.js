import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      fullNameInput: "",
      usernameInput: "",
      passwordInput: "",
      retypePasswordInput: "",
      message: "",
    };
  }

  onFullNameChange = (event) => {
    this.setState({ fullNameInput: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  onRetypePasswordChange = (event) => {
    this.setState({ retypePasswordInput: event.target.value });
  };

  goHome = () => {
    this.props.onRegisteringUpdate(false);
  };

  registerUser = () => {
    const {
      fullNameInput,
      usernameInput,
      passwordInput,
      retypePasswordInput,
    } = this.state;

    let alreadyInUseFlag = false;
    this.props.savedUsers.forEach((element) => {
      if (usernameInput === element.username) {
        console.log("Username already in use");
        this.setState({
          message: "Username already in use, please choose another",
        });
        alreadyInUseFlag = true;
        return;
      }
    });
    if (alreadyInUseFlag) {
      this.setState({
        passwordInput: "",
        retypePasswordInput: "",
        username: "",
      });
      return;
    }

    if (passwordInput !== retypePasswordInput) {
      console.log("password mismatch");
      this.setState({ message: "Passwords do not match, please try again" });
      this.setState({ passwordInput: "", retypePasswordInput: "" });
      return;
    }
    if (
      passwordInput === "" ||
      retypePasswordInput === "" ||
      usernameInput === "" ||
      fullNameInput === ""
    ) {
      this.setState({ message: "All fields are required" });
      return;
    }
    const newUserId =
      this.props.savedUsers[this.props.savedUsers.length - 1].userId + 1;
    this.props.onSavedUsersUpdate([
      ...this.props.savedUsers,
      {
        name: fullNameInput,
        username: usernameInput,
        password: passwordInput,
        userId: newUserId,
      },
    ]);
    console.log("made a new user id");
  };

  render() {
    const { message } = this.state;

    return (
      <div className="background">
        <div className="welcome">
          <h1>Custom Spellbook Generator</h1>
        </div>
        {message && <h3>{message}</h3>}
        <div className="registration-window">
          <h2>Enter Your Information</h2>
          <input
            type="text"
            className="input-box"
            placeholder="Full Name"
            value={this.state.fullNameInput}
            onChange={this.onFullNameChange}
          />
          <input
            type="text"
            className="input-box"
            placeholder="Username"
            value={this.state.usernameInput}
            onChange={this.onUsernameChange}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Password"
            value={this.state.passwordInput}
            onChange={this.onPasswordChange}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Retype Password"
            value={this.state.retypePasswordInput}
            onChange={this.onRetypePasswordChange}
          />
          <button onClick={this.registerUser}>Register</button>
        </div>

        <button className="small-button" onClick={this.goHome}>
          Return To Sign In
        </button>
      </div>
    );
  }
}

Register.propTypes = {
  usernames: PropTypes.array,
};

export default Register;
