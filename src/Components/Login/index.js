import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      usernames: props.usernames,
      passwords: props.passwords,
      usernameInput: "",
      passwordInput: "",
      message: "",
    };
  }

  checkCredentials = () => {
    const { usernames, usernameInput, passwords, passwordInput } = this.state;
    const index = usernames.indexOf(usernameInput);
    if (index === -1) {
      this.setState({ message: "Username not found, please Register" });
      return;
    }
    if (passwords[index] !== passwordInput) {
      this.setState({ message: "Incorrect password, please try again" });
    }
    this.setState({ message: "" });
    this.props.onLoginUpdate(true);
  };

  onPasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  render() {
    const { message } = this.state;

    return (
      <div className="background">
        <div className="welcome">
          <h1>Custom Spellbook Generator</h1>
        </div>
        {message && <h3>{message}</h3>}
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
            type="text"
            className="input-box"
            placeholder="Password"
            value={this.state.passwordInput}
            onChange={this.onPasswordChange}
          />
          <button onClick={this.checkCredentials}>Sign In</button>

          <hr />

          <button>Register</button>

          <h4>or</h4>

          <button>Forgot Your Password?</button>

          <br />
        </div>
        <div />
        <div />
        <div />
      </div>
    );
  }
}

Login.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  passwords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Login;
