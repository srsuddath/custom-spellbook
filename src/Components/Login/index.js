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
      <div className="background">
        <div className="welcome">
          <h1>Custom Spellbook Generator</h1>
        </div>
        <div className="login-window">
          <h2>Please Log In</h2>
          <input type="text" className="input-box" placeholder="Username" />
          <input type="text" className="input-box" placeholder="Password" />
          <button>Sign In</button>
          <hr />
          <button>Register</button>
          <h4>or</h4>
          <button>Forgot Your Password?</button>
          <br />

        </div>
        <div className="spacer" />
      </div>
    )
  }
}

export default Login;