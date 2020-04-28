import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Wrapper } from './styles';

import { LOGIN } from '../App/PAGES';

class ForgottenPassword extends Component {
  // type checking for props
  static propTypes = {
    changePage: PropTypes.func.isRequired,
    onMessageUpdate: PropTypes.func.isRequired,
    onSavedUsersUpdate: PropTypes.func.isRequired,
    savedUsers: PropTypes.array.isRequired,
  };

  // constructor, set initial value for state variables to prop inputs
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      passwordInput: '',
      preserveUserID: undefined,
      retypePasswordInput: '',
      userIndex: undefined,
      usernameFound: false,
      usernameInput: '',
    };
  }

  // add keyboard event listener on did mount
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  // remove keyboard event listener on will umnmount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // handler for keyboard events
  onKeyDown = (event) => {
    const { usernameFound } = this.state;
    if (event.keyCode === 13) {
      if (!usernameFound) {
        this.findUserInfo();
        return;
      }
      if (usernameFound) {
        this.updatePassword();
      }
    }
  };

  // function for updating state
  onInputChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  // function to return to login page
  goHome = () => {
    this.props.changePage(LOGIN);
  };

  // function to find existing user data for password changing
  findUserInfo = () => {
    // set flag for username found to false
    let userFoundFlag = false;

    // get relevant state data
    const { usernameInput, nameInput } = this.state;

    // loop through all saved user searching for one matching the input name and username
    this.props.savedUsers.forEach((element, index) => {
      // if found pull relevant data and save to state, so we can update the password
      if (usernameInput === element.username && nameInput === element.name) {
        // set found flag to true
        userFoundFlag = true;
        // set state data
        this.setState({
          preserveUserID: element.userId,
          userIndex: index,
          usernameFound: true,
        });
        // set message
        this.props.onMessageUpdate('User account found');
      }
    });

    // if user is not found from input data, clear inputs and prompt to try again
    if (!userFoundFlag) {
      this.setState({
        nameInput: '',
        usernameInput: '',
      });
      this.props.onMessageUpdate('User info not found');
    }
  };

  // function to update a found user's password
  updatePassword = () => {
    // get state data
    const { passwordInput, retypePasswordInput, usernameInput, nameInput, userIndex, preserveUserID } = this.state;

    // check to make sure passwords match
    if (passwordInput !== retypePasswordInput) {
      console.log('password mismatch');
      this.setState({
        passwordInput: '',
        retypePasswordInput: '',
      });
      this.props.onMessageUpdate('Passwords do not match, please try again');
      return;
    }

    // create new user with updated data
    const updatedUser = {
      name: nameInput,
      password: passwordInput,
      userId: preserveUserID,
      username: usernameInput,
    };

    // create new array of saved users, replacing the old instance of this user with the updated user
    const newSavedUsers = this.props.savedUsers.map((element, index) => {
      if (index === userIndex) {
        return updatedUser;
      }
      return element;
    });

    // show success message
    this.props.onMessageUpdate('Password successfully updated!');

    // update saved users data with new array
    this.props.onSavedUsersUpdate(newSavedUsers);

    // set flag to return to login screen
    this.props.changePage(LOGIN);
  };

  render() {
    const { usernameFound } = this.state;

    return (
      <Wrapper>
        {/* "window" for password reset options to appear in */}
        <div className="window">
          {/* Option set 1: user name hasnt been found yet */}
          {!usernameFound && (
            <>
              {/* User instruction propmt */}
              <h2>Your Account</h2>

              {/* input for name */}
              <input
                className="input-box"
                placeholder="Full Name"
                type="text"
                value={this.state.nameInput}
                onChange={this.onInputChange('nameInput')}
              />

              {/* input for username */}
              <input
                className="input-box"
                placeholder="Username"
                type="text"
                value={this.state.usernameInput}
                onChange={this.onInputChange('usernameInput')}
              />
              <button
                className="action-button"
                type="submit"
                onClick={this.findUserInfo}
              >
                Find Me
              </button>
            </>
          )}

          {/* Option 2: Username has been found and loaded, show fields for changing password */}
          {usernameFound && (
            <>
              {/* Display found user data */}
              {/* instructions */}
              <h3>Update Password</h3>

              {/* new password input */}
              <input
                className="input-box"
                placeholder="Password"
                type="password"
                value={this.state.passwordInput}
                onChange={this.onInputChange('passwordInput')}
              />

              {/* retype new password input */}
              <input
                className="input-box"
                placeholder="Retype Password"
                type="password"
                value={this.state.retypePasswordInput}
                onChange={this.onInputChange('retypePasswordInput')}
              />

              {/* submit button to update password */}
              <button
                className="action-button"
                type="button"
                onClick={this.updatePassword}
              >
                Update
              </button>
            </>
          )}
          {/* button to "quit out" and return to login screen */}
          <button
            className="link"
            type="button"
            onClick={this.goHome}
          >
            Return To Sign In
          </button>
        </div>
      </Wrapper>
    );
  }
}

export default ForgottenPassword;
