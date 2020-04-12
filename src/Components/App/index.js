import React, { Component } from "react";

import "./styles.css";
import Login from "../Login";
// import Register from "../Register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      registering: false,
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

  render() {
    const { savedUsers, loggedIn, registering } = this.state;
    return (
      <div className="app">
        {!loggedIn && !registering && (
          <Login
            onLoginUpdate={this.onLoginUpdate}
            onRegisteringUpdate={this.onRegisteringUpdate}
            savedUsers={savedUsers}
            onActiveUserIdUpdate={this.onActiveUserIdUpdate}
          />
        )}
        {/* {registering && <Register />} */}
      </div>
    );
  }
}

export default App;
