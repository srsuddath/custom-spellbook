import PropTypes from "prop-types";
import React, { Component } from "react";

import "./styles.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="background">
        <div className="registration-window"></div>

        <button className="small-button">LogOut</button>
      </div>
    );
  }
}

MainPage.propTypes = {};

export default MainPage;
