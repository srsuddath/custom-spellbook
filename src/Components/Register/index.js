import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      nameInput: "",
      usernameInput: "",
      passwordInput: "",
      message: "",
    };
  }

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
          <button>Sign In</button>

          <hr />

          <button>Register</button>

          <h4>or</h4>

          <button>Forgot Your Password?</button>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  usernames: PropTypes.array,
};

export default Register;
