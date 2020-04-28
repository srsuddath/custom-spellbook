import React, { Component } from 'react';

import { Wrapper } from './styles';
import Login from '../Login';
import Register from '../Register';
import ForgottenPassword from '../ForgottenPassword';
import Mainpage from '../MainPage';

class App extends Component {
  constructor(props) {
    super(props);
    // set initial state values
    this.state = {
      activeUserId: '',
      activeUserName: '',
      forgottenPassword: false,
      loggedIn: false,
      message: '',
      registering: false,
      savedUsers: [],
    };
  }

  componentDidMount() {
    // load array of saved users from local storage
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];

    // save array from local storage to state
    this.setState({ savedUsers });

    // log the imported array of saved users to the console (dev purposes)
    console.log('Saved Users: ');
    console.log(savedUsers);

    // add event listener to handle "enter" key presses
    document.addEventListener('keydown', this.onKeyDown);

    // add event listener to handle data saving when exiting the app
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    // regardless of how the app exits, run the "before unload" function
    this.onBeforeUnload();

    // remove keyboard listener
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onBeforeUnload = () => {
    // get saved users state for storage to local storage
    const { savedUsers } = this.state;

    // stringify saved users and port it to local storage
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));

    // remove unload event listener
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  };

  // function to update app state loggedIn from components
  onLoginUpdate = (loggedIn) => {
    this.setState({ loggedIn });
  };

  // function to update app state registering from components
  onRegisteringUpdate = (registering) => {
    this.setState({ registering });
  };

  // function to update app state activeUserId from components
  onActiveUserIdUpdate = (activeUserId) => {
    this.setState({ activeUserId });
  };

  // function to update app statesavedUsers from components
  onSavedUsersUpdate = (savedUsers) => {
    this.setState({ savedUsers });
  };

  // function to update app state forgottenPassword from components
  onForgottenPasswordUpdate = (forgottenPassword) => {
    this.setState({ forgottenPassword });
  };

  // function to update app state message from components
  onMessageUpdate = (message) => {
    this.setState({ message });
  };

  // function to update app state activeUserName from components
  onActiveUserNameUpdate = (activeUserName) => {
    this.setState({ activeUserName });
  };

  logout = () => {
    window.location.reload();
  };

  render() {
    // grab relevant state variables
    const { savedUsers, loggedIn, registering, forgottenPassword, message, activeUserName, activeUserId } = this.state;

    // render return
    return (
      <Wrapper>
        {/* Title */}
        <header>
          <div />
          <h1>Custom Spellbook Generator</h1>
          <div className="user-info">
            {activeUserName && (
              <>
                <p>{activeUserName}</p>
                <button
                  type="button"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </header>

        {/* Message  */}
        <h3 className="message">{message}</h3>

        {/* Login Component */}
        {!loggedIn && !registering && !forgottenPassword && (
          <Login
            savedUsers={savedUsers}
            onActiveUserIdUpdate={this.onActiveUserIdUpdate}
            onActiveUserNameUpdate={this.onActiveUserNameUpdate}
            onForgottenPasswordUpdate={this.onForgottenPasswordUpdate}
            onLoginUpdate={this.onLoginUpdate}
            onMessageUpdate={this.onMessageUpdate}
            onRegisteringUpdate={this.onRegisteringUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component used to register users */}
        {registering && !forgottenPassword && !loggedIn && (
          <Register
            savedUsers={savedUsers}
            onMessageUpdate={this.onMessageUpdate}
            onRegisteringUpdate={this.onRegisteringUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component used to change passwords */}
        {forgottenPassword && !loggedIn && !registering && (
          <ForgottenPassword
            savedUsers={savedUsers}
            onForgottenPasswordUpdate={this.onForgottenPasswordUpdate}
            onMessageUpdate={this.onMessageUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component where spells are displayed / added / deleted / modified */}
        {loggedIn && (
          <Mainpage
            activeUserId={activeUserId}
            activeUserName={activeUserName}
            onMessageUpdate={this.onMessageUpdate}
          />
        )}
      </Wrapper>
    );
  }
}

export default App;
