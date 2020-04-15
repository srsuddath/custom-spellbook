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
      savedUsers: JSON.parse(localStorage.getItem("savedUsers")) || [],
    };
  }
  componenetDidMount() {
    console.log("ComponentDidMount()");
    this.setState({ message: "I MOUNTED" });
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    this.setState({ savedUsers });
    console.log("Loaded Memory");
    console.log(savedUsers);
    return;
  }

  componenetWillUnmount() {
    console.log("ComponentWillUnmount()");
    const { savedUsers } = this.state;
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    console.log("Saved Memory Data");
  }

  dataTestLoad = () => {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
    this.setState({ savedUsers });
    console.log(savedUsers);
  };

  dataTestSet = () => {
    const { savedUsers } = this.state;
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    console.log(savedUsers);
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
        <div className="testButtons">
          <button onClick={this.dataTestSet}>Data Test Set</button>
          <button onClick={this.dataTestLoad}>Data Test Load</button>
        </div>
      </div>
    );
  }
}

export default App;
