import React, { Component } from 'react';

import { Wrapper } from './styles';
import Login from '../Login';
import Register from '../Register';
import ForgottenPassword from '../ForgottenPassword';
import SpellsList from '../SpellsList';
import { LOGIN, REGISTER, SPELLS_LIST, FORGOTTEN_PASSWORD } from './PAGES';

class App extends Component {
  constructor(props) {
    super(props);
    // set initial state values
    this.state = {
      activeUserId: '',
      activeUserName: '',
      message: '',
      page: LOGIN,
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

  changePage = (page) => {
    this.setState({ page });
  };

  // function to update app state activeUserId from components
  onActiveUserIdUpdate = (activeUserId) => {
    this.setState({ activeUserId });
  };

  // function to update app statesavedUsers from components
  onSavedUsersUpdate = (savedUsers) => {
    this.setState({ savedUsers });
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
    const { savedUsers, message, activeUserName, activeUserId, page } = this.state;

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
                <button type="button" onClick={this.logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </header>

        {/* Message  */}
        <h3 className="message">{message}</h3>

        {/* Login Component */}
        {page === LOGIN && (
          <Login
            changePage={this.changePage}
            savedUsers={savedUsers}
            onActiveUserIdUpdate={this.onActiveUserIdUpdate}
            onActiveUserNameUpdate={this.onActiveUserNameUpdate}
            onMessageUpdate={this.onMessageUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component used to register users */}
        {page === REGISTER && (
          <Register
            changePage={this.changePage}
            savedUsers={savedUsers}
            onMessageUpdate={this.onMessageUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component used to change passwords */}
        {page === FORGOTTEN_PASSWORD && (
          <ForgottenPassword
            changePage={this.changePage}
            savedUsers={savedUsers}
            onMessageUpdate={this.onMessageUpdate}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
          />
        )}

        {/* Component where spells are displayed / added / deleted / modified */}
        {page === SPELLS_LIST && <SpellsList activeUserId={activeUserId} onMessageUpdate={this.onMessageUpdate} />}
      </Wrapper>
    );
  }
}

export default App;
