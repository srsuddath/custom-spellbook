import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      usernameInput: "",
      passwordInput: "",
      retypePasswordInput: "",
      usernameFound: false,
      userIndex: undefined,
      preserveUserID: undefined,
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
    this.props.onForgottenPasswordUpdate(false);
  };

  findUserInfo = () => {
    let userFoundFlag = false;
    const { usernameInput, nameInput } = this.state;

    this.props.savedUsers.forEach((element, index) => {
      if (usernameInput === element.username && nameInput === element.name) {
        userFoundFlag = true;
        this.setState({
          userIndex: index,
          usernameFound: true,
          preserveUserID: element.userId,
        });
        this.props.onMessageUpdate("User Info Found");
      }
    });

    if (!userFoundFlag) {
      this.setState({
        usernameInput: "",
        nameInput: "",
      });

      this.props.onMessageUpdate("User Info Not Found");
    }
  };

  updatePassword = () => {
    const {
      passwordInput,
      retypePasswordInput,
      usernameInput,
      nameInput,
      userIndex,
      preserveUserID,
    } = this.state;

    if (passwordInput !== retypePasswordInput) {
      console.log("password mismatch");
      this.setState({
        passwordInput: "",
        retypePasswordInput: "",
      });
      this.props.onMessageUpdate("Passwords do not match, please try again");
      return;
    }
    const updatedUser = {
      name: nameInput,
      username: usernameInput,
      password: passwordInput,
      userId: preserveUserID,
    };

    const savedUsers = this.props.savedUsers.map((element, index) => {
      if (index === userIndex) {
        return updatedUser;
      }
      return element;
    });

    this.props.onSavedUsersUpdate(savedUsers);
  };

  render() {
    const { usernameFound, nameInput, usernameInput } = this.state;

    return (
      <div className="background">
        <div className="forgotten-password-window">
          {!usernameFound && (
            <div className="prompt-divider">
              <h2>Enter User Information</h2>
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
              <button onClick={this.findUserInfo}>Find User Account</button>
            </div>
          )}
          {usernameFound && (
            <div className="prompt-divider">
              <h3>{"Name: " + nameInput}</h3>
              <h3>{"Username: " + usernameInput}</h3>
              <hr />
              <h3>Enter New Password</h3>
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
              <button onClick={this.updatePassword}>Update Password</button>
            </div>
          )}
        </div>
        <button className="small-button" onClick={this.goHome}>
          Return To Sign In
        </button>
      </div>
    );
  }
}

ForgottenPassword.propTypes = {
  savedUsers: PropTypes.array.isRequired,
};

export default ForgottenPassword;
