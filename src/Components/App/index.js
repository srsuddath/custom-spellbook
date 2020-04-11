import React, { Component } from 'react';

import './styles.css';
import Login from '../Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      savedUsers: ['admin'],
      savedPasswords: ['password'],
    };
  }

  componenetDidMount() {}

  componenetWillUnmount() {}

  onLoginUpdate = (loggedIn) => {
    this.setState({ loggedIn });
  };

  render() {
    const { savedUsers, savedPasswords, loggedIn } = this.state;

    return (
      <div className="app">
        {!loggedIn && <Login onLoginUpdate={this.onLoginUpdate} usernames={savedUsers} passwords={savedPasswords} />}
      </div>
    );
  }
}

export default App;
