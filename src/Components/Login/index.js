import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Wrapper } from './styles';

class Login extends Component {
  // do type checking for all props
  static propTypes = {
    savedUsers: PropTypes.array.isRequired,
    onMessageUpdate: PropTypes.func,
    onActiveUserIdUpdate: PropTypes.func,
    onActiveUserNameUpdate: PropTypes.func,
    onLoginUpdate: PropTypes.func,
    onRegisteringUpdate: PropTypes.func,
    onForgottenPasswordUpdate: PropTypes.func,
  };

  // set initial state values
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
    };
  }

  // add event listener for key press during did mount
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  // remove event listener for key press during will unmount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // handler for keypress events
  onKeyDown = (event) => {
    // keycode 13 is the enter key
    if (event.keyCode === 13) {
      // check credentials if enter key is pressed
      this.checkCredentials();
    }
  };

  // func to check credentials and log a user in
  checkCredentials = () => {
    // get state data
    const { usernameInput, passwordInput } = this.state;
    if (!this.props.savedUsers) {
      // if there are no savedUsers, then prompt the user to register
      this.props.onMessageUpdate('Username not found, please Register');
      return;
    }

    // set user found flag to false
    let userFound = false;
    // loop through saved users to see if user and password combo match existing profiles
    this.props.savedUsers.forEach((user) => {
      // if user and password match inputs
      if (user.username === usernameInput && user.password === passwordInput) {
        // set user found flag to true
        userFound = true;

        // blank out message
        this.props.onMessageUpdate('');
        // set app user id to the logged in user id
        this.props.onActiveUserIdUpdate(user.userId);

        // set logged in user name to found name
        this.props.onActiveUserNameUpdate(user.name);

        // set logged in flag to load main page
        this.props.onLoginUpdate(true);
      }

      // if correct username is entered, but password doesnt match
      if (user.username === usernameInput && user.password !== passwordInput) {
        // set user found flag so we don't send the wrong message
        userFound = true;
        // prompt user to try password again
        this.props.onMessageUpdate('Incorrect password, please try again');
      }
    });

    // if user name was not found at all, prompt the user to register
    if (userFound === false) {
      this.props.onMessageUpdate('Username not found, please Register');
    }
  };

  // function for updating state
  onInputChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  // func to set registering flag to switch to "registration page"
  startRegistering = () => {
    this.props.onRegisteringUpdate(true);
    this.props.onMessageUpdate('');
  };

  // func to set forgotten password flag to switch to "password reset page"
  forgotPassword = () => {
    this.props.onForgottenPasswordUpdate(true);
    this.props.onMessageUpdate('');
  };

  render() {
    return (
      <Wrapper>
        {/* Window to display forms */}
        <div className="window">
          {/* Instructions for user */}
          <h2>Login</h2>

          {/* Input Field for Username */}
          <input
            placeholder="Username"
            type="text"
            value={this.state.usernameInput}
            onChange={this.onInputChange('usernameInput')}
          />

          {/* input field for password */}
          <input
            placeholder="Password"
            type="password"
            value={this.state.passwordInput}
            onChange={this.onInputChange('passwordInput')}
          />

          {/* Login Button */}
          <button
            className="action-button"
            type="button"
            onClick={this.checkCredentials}
          >
            Sign In
          </button>
          {/* Register Button */}
          <button
            className="link"
            type="button"
            onClick={this.startRegistering}
          >
            Register
          </button>
          {/* Password Change Button */}
          <button
            className="link"
            type="button"
            onClick={this.forgotPassword}
          >
            Forgot Your Password?
          </button>
        </div>
      </Wrapper>
    );
  }
}

export default Login;
