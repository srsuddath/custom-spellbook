import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './styles.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  };

  render() {

    return (
      <div className="login-window">
        <div className="inputs">
          <h2>Username</h2>
          <input type="text" className="username-box" />

          <h2>Password</h2>
          <input type="text" className="password-box" />

          <h4>Register</h4>
        </div>

      </div>
    )
  }
}

export default Login;