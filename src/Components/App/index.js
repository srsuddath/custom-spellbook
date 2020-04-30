import React, { Component } from 'react';

import { Wrapper } from './styles';
import Login from '../Login';
import Register from '../Register';
import ForgottenPassword from '../ForgottenPassword';
import SpellsList from '../SpellsList';
import CreateSpell from '../CreateSpell';
import {
  LOGIN,
  REGISTER,
  SPELLS_LIST,
  FORGOTTEN_PASSWORD,
  CREATE_SPELL,
} from './PAGES';

class App extends Component {
  constructor(props) {
    super(props);
    // set initial state values
    this.state = {
      activeUserId: '', // 0,
      activeUserName: '', // 'Sam',
      message: '',
      page: LOGIN, // SPELLS_LIST,
      savedUsers: [],
      savedSpells: [],
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

    const savedSpells = JSON.parse(localStorage.getItem('savedSpells')) || [];

    // save array from local storage to state
    this.setState({ savedSpells });

    // log the imported array of saved spells to the console (dev purposes)
    console.log('Saved Spells: ');
    console.log(savedSpells);

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
    // get saved users state and saved spells state for storage to local storage
    const { savedUsers, savedSpells } = this.state;

    // stringify saved users and port it to local storage
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));

    // stringify saved spells and port it to local storage
    localStorage.setItem('savedSpells', JSON.stringify(savedSpells));

    // remove unload event listener
    window.removeEventListener('beforeunload', this.onBeforeUnload);

    // uncomment the line below if you need to wipe memory
    // localStorage.clear();
  };

  changePage = (page) => {
    this.setState({ page });
  };

  // function to update app state activeUserId from components
  onActiveUserIdUpdate = (activeUserId) => {
    this.setState({ activeUserId });
  };

  // function to update app state savedUsers from components
  onSavedUsersUpdate = (savedUsers) => {
    this.setState({ savedUsers });
  };

  // function to update app state savedSpells from components
  onSavedSpellsUpdate = (savedSpells) => {
    this.setState({ savedSpells });
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
    const {
      savedUsers,
      savedSpells,
      message,
      activeUserName,
      activeUserId,
      page,
    } = this.state;

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
        <h3 className={`message${page !== SPELLS_LIST ? '' : ' hidden'}`}>
          {message}
        </h3>

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
        {page === SPELLS_LIST && (
          <SpellsList
            activeUserId={activeUserId}
            changePage={this.changePage}
            onMessageUpdate={this.onMessageUpdate}
            onSavedSpellsUpdate={this.onSavedSpellsUpdate}
            savedSpells={savedSpells}
          />
        )}

        {/* Component used to create new spells and add them to a user's spell list */}
        {page === CREATE_SPELL && (
          <CreateSpell
            activeUserId={activeUserId}
            changePage={this.changePage}
            onMessageUpdate={this.onMessageUpdate}
            onSavedSpellsUpdate={this.onSavedSpellsUpdate}
            savedSpells={savedSpells}
          />
        )}
      </Wrapper>
    );
  }
}

export default App;
