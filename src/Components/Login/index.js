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
      message: "",
    };
  }

  checkCredentials = (props) => {
    const { usernameInput, passwordInput } = this.state;
    console.log("savedUsers:" + this.props.savedUsers);
    for (let i = 0; i < this.props.savedUsers.length; i++) {
      if (this.props.savedUsers[i].username === usernameInput) {
        if (this.props.savedUsers[i].password !== passwordInput) {
          this.setState({ message: "Incorrect password, please try again" });
          return;
        }
        this.setState({ message: "" });
        this.props.onLoginUpdate(true);
        this.props.onActiveUserIdUpdate(this.props.savedUsers[i].userId);
        return;
      }
      this.setState({ message: "Username not found, please Register" });
      return;
    }
  };

  onPasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  startRegistering = () => {
    this.props.onRegisteringUpdate(true);
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

          <button onClick={this.startRegistering}>Register</button>

          <h4>or</h4>

          <button>Forgot Your Password?</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  usernames: PropTypes.array,
};

export default Login;
