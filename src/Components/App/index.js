import React, { Component } from "react";

import "./styles.css";
import Login from "../Login";
import Register from "../Register";
import ForgottenPassword from "../ForgottenPassword";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loggedIn: false,
      registering: false,
      forgottenPassword: false,
      activeUserID: undefined,
      savedUsers: [
        {
          name: "Sam",
          username: "admin",
          password: "password",
          userId: 1,
        },
      ],
    };
  }

  componenetDidMount() {}

  componenetWillUnmount() {}

  onLoginUpdate = (loggedIn) => {
    this.setState({ loggedIn });
  };

  onRegisteringUpdate = (registering) => {
    this.setState({ registering });
  };

  onActiveUserIdUpdate = (activeUserId) => {
    this.setState({ activeUserId });
  };

  onSavedUsersUpdate = (savedUsers) => {
    this.setState({ savedUsers });
  };

  onForgottenPasswordUpdate = (forgottenPassword) => {
    this.setState({ forgottenPassword });
  };

  onMessageUpdate = (message) => {
    this.setState({ message });
  };

  render() {
    const {
      savedUsers,
      loggedIn,
      registering,
      forgottenPassword,
      message,
    } = this.state;
    return (
      <div className="app">
        <div className="welcome">
          <h1>Custom Spellbook Generator</h1>
        </div>

        <h3 className="message">{message}</h3>

        {!loggedIn && !registering && !forgottenPassword && (
          <Login
            onLoginUpdate={this.onLoginUpdate}
            onRegisteringUpdate={this.onRegisteringUpdate}
            onForgottenPasswordUpdate={this.onForgottenPasswordUpdate}
            savedUsers={savedUsers}
            onActiveUserIdUpdate={this.onActiveUserIdUpdate}
            onMessageUpdate={this.onMessageUpdate}
          />
        )}
        {registering && !forgottenPassword && !loggedIn && (
          <Register
            onRegisteringUpdate={this.onRegisteringUpdate}
            savedUsers={savedUsers}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
            onMessageUpdate={this.onMessageUpdate}
          />
        )}
        {forgottenPassword && !loggedIn && !registering && (
          <ForgottenPassword
            savedUsers={savedUsers}
            onSavedUsersUpdate={this.onSavedUsersUpdate}
            onForgottenPasswordUpdate={this.onForgottenPasswordUpdate}
            onMessageUpdate={this.onMessageUpdate}
          />
        )}
      </div>
    );
  }
}

export default App;
