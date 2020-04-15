import React, { Component } from "react";

import "./styles.css";
import Login from "../Login";
import Register from "../Register";
import ForgottenPassword from "../ForgottenPassword";
import Mainpage from "../MainPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loggedIn: false,
      registering: false,
      forgottenPassword: false,
      activeUserID: undefined,
      savedUsers: [],
    };
  }
  componentDidMount() {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    this.setState({ savedUsers });
    console.log("Loaded Memory");
    console.log(savedUsers);
  }

  componentWillUnmount() {
    const { savedUsers } = this.state;
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  }

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
    // localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    // console.log("Saved Memory Data");
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
            onSavedUsersUpdate={this.onSavedUsersUpdate}
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
        {loggedIn && <Mainpage />}
      </div>
    );
  }
}

export default App;
