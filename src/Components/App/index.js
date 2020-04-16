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
      activeUserName: undefined,
      savedUsers: [],
    };
  }
  componentDidMount() {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    this.setState({ savedUsers });
    console.log("Loaded Memory");
    console.log(savedUsers);

    document.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }

  componentWillUnmount() {
    this.onBeforeUnload();
  }

  onBeforeUnload = () => {
    const { savedUsers } = this.state;
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    window.removeEventListener("beforeunload", this.setStateToLocalStorage);
  };

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

  onActiveUserNameUpdate = (activeUserName) => {
    this.setState({ activeUserName });
  };

  render() {
    const {
      savedUsers,
      loggedIn,
      registering,
      forgottenPassword,
      message,
      activeUserName,
      activeUserID,
    } = this.state;
    return (
      <div className="app">
        <header>
          <h1>Custom Spellbook Generator</h1>
        </header>

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
            onActiveUserNameUpdate={this.onActiveUserNameUpdate}
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
        {loggedIn && (
          <Mainpage
            activeUserName={activeUserName}
            activeUserID={activeUserID}
          />
        )}
      </div>
    );
  }
}

export default App;
