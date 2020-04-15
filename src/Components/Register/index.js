import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      usernameInput: "",
      passwordInput: "",
      retypePasswordInput: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ nameInput: event.target.value });
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
      nameInput,
      usernameInput,
      passwordInput,
      retypePasswordInput,
    } = this.state;

    let alreadyInUseFlag = false;
    this.props.savedUsers.forEach((element) => {
      if (usernameInput === element.username) {
        console.log("Username already in use");
        this.props.onMessageUpdate(
          "Username already in use, please choose another"
        );
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
      this.props.onMessageUpdate("Passwords do not match, please try again");
      this.setState({
        passwordInput: "",
        retypePasswordInput: "",
      });
      return;
    }
    if (
      passwordInput === "" ||
      retypePasswordInput === "" ||
      usernameInput === "" ||
      nameInput === ""
    ) {
      this.props.onMessageUpdate("All fields are required");
      return;
    }
    if (this.props.savedUsers.length !== 0) {
      const newUserId =
        this.props.savedUsers[this.props.savedUsers.length - 1].userId + 1;

      const newUserProfile = {
        name: nameInput,
        username: usernameInput,
        password: passwordInput,
        userId: newUserId,
      };
      const savedUsers = [...this.props.savedUsers, newUserProfile];
      this.props.onSavedUsersUpdate(savedUsers);
    }
    if (this.props.savedUsers.length === 0) {
      const savedUsers = [
        {
          name: nameInput,
          username: usernameInput,
          password: passwordInput,
          userId: 0,
        },
      ];
      this.props.onSavedUsersUpdate(savedUsers);
    }
    this.props.onRegisteringUpdate(false);
    this.props.onMessageUpdate("Registration Success!");
  };

  render() {
    return (
      <div className="background">
        <div className="registration-window">
          <h2>Enter Your Information</h2>
          <input
            type="text"
            className="input-box"
            placeholder="Full Name"
            value={this.state.nameInput}
            onChange={this.onNameChange}
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
  savedUsers: PropTypes.array.isRequired,
};

export default Register;
