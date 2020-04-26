import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './styles.css';

class Login extends Component {
  static propTypes = {
    savedUsers: PropTypes.array.isRequired,
    onMessageUpdate: PropTypes.func,
    onActiveUserIdUpdate: PropTypes.func,
    onActiveUserNameUpdate: PropTypes.func,
    onLoginUpdate: PropTypes.func,
    onRegisteringUpdate: PropTypes.func,
    onForgottenPasswordUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.checkCredentials();
    }
  };

  checkCredentials = () => {
    const { usernameInput, passwordInput } = this.state;
    if (!this.props.savedUsers) {
      this.props.onMessageUpdate('Username not found, please Register');
      return;
    }

    let userFound = false;
    this.props.savedUsers.forEach((user) => {
      if (user.username === usernameInput && user.password === passwordInput) {
        userFound = true;
        this.props.onMessageUpdate('');
        this.props.onActiveUserIdUpdate(user.userId);
        this.props.onActiveUserNameUpdate(user.name);
        this.props.onLoginUpdate(true);
      }
      if (user.username === usernameInput && user.password !== passwordInput) {
        userFound = true;
        this.props.onMessageUpdate('Incorrect password, please try again');
      }
    });
    if (userFound === false) {
      this.props.onMessageUpdate('Username not found, please Register');
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
    this.props.onMessageUpdate('');
  };

  forgotPassword = () => {
    this.props.onForgottenPasswordUpdate(true);
    this.props.onMessageUpdate('');
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
          <button type="button" onClick={this.checkCredentials}>
            Sign In
          </button>

          <hr />

          <button type="button" onClick={this.startRegistering}>
            Register
          </button>

          <h4>or</h4>

          <button type="button" onClick={this.forgotPassword}>
            Forgot Your Password?
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
