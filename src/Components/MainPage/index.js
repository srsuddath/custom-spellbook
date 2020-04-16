import PropTypes from "prop-types";
import React, { Component } from "react";
import icon from "./userIcon.png";

import "./styles.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserID: undefined,
    };
  }

  render() {
    return (
      <div className="background">
        <div className="window">
          <aside>
            <img src={icon} alt="User Icon" height="50" width="50" />
            <h3>{this.props.activeUserName}</h3>
          </aside>
          <main>
            <p> spells go here</p>
          </main>
        </div>
        <button className="small-button">LogOut</button>
      </div>
    );
  }
}

MainPage.propTypes = {};

export default MainPage;
