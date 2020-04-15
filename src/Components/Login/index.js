import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      usernameInput: "",
      passwordInput: "",
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.checkCredentials();
      return;
    }
  };

  checkCredentials = (props) => {
    const { usernameInput, passwordInput } = this.state;
    if (!this.props.savedUsers) {
      this.props.onMessageUpdate("Username not found, please Register");
      return;
    }
    for (let i = 0; i < this.props.savedUsers.length; i++) {
      if (this.props.savedUsers[i].username === usernameInput) {
        if (this.props.savedUsers[i].password !== passwordInput) {
          this.props.onMessageUpdate("Incorrect password, please try again");
          return;
        }
        this.props.onMessageUpdate("");
        this.props.onLoginUpdate(true);
        this.props.onActiveUserIdUpdate(this.props.savedUsers[i].userId);
        return;
      }
    }
    this.props.onMessageUpdate("Username not found, please Register");
    return;
  };

  onPasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  startRegistering = () => {
    this.props.onRegisteringUpdate(true);
    this.props.onMessageUpdate("");
  };

  forgotPassword = () => {
    this.props.onForgottenPasswordUpdate(true);
    this.props.onMessageUpdate("");
  };

  render() {
    return (
      <div className="background">
        <div className="login-window">
          <h2>Please Log In</h2>

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
          <button onClick={this.checkCredentials}>Sign In</button>

          <hr />

          <button onClick={this.startRegistering}>Register</button>

          <h4>or</h4>

          <button onClick={this.forgotPassword}>Forgot Your Password?</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  usernames: PropTypes.array,
};

export default Login;
