import PropTypes from "prop-types";
import React, { Component } from "react";
import icon from "./userIcon.png";

import "./styles.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserID: this.props.activeUserID,
      inputTitle: "",
      inputSchool: "",
      inputLevel: "",
      inputDurationQuantifier: "",
      inputDuration: "",
      inputDescription: "",
      savedSpells: [],
    };
  }

  componentDidMount() {
    const savedSpells = JSON.parse(localStorage.getItem("savedSpells")) || [];
    this.setState({ savedSpells });
    window.addEventListener("beforeunload", this.onBeforeUnload);
    console.log(savedSpells);
  }

  componentWillUnmount() {
    this.onBeforeUnload();
  }

  onBeforeUnload = () => {
    const { savedSpells } = this.state;
    localStorage.setItem("savedSpells", JSON.stringify(savedSpells));
    window.removeEventListener("beforeunload", this.setStateToLocalStorage);
  };
  createSpell = () => {
    const {
      activeUserID,
      inputTitle,
      inputSchool,
      inputLevel,
      inputDurationQuantifier,
      inputDuration,
      inputDescription,
      savedSpells,
    } = this.state;

    let spellAlreadyExists = false;
    savedSpells.forEach((element) => {
      if (element.userID === activeUserID && element.title === inputTitle) {
        this.props.onMessageUpdate(
          "Spell name is already taken, please try again"
        );
        spellAlreadyExists = true;
      }
    });

    if (spellAlreadyExists) {
      console.log("Spell name is already taken, please try again");
      return;
    }

    if (activeUserID === "") {
      console.log("Error with User ID");
      return;
    }
    if (inputTitle === "") {
      console.log("Can't have an empty title");
      return;
    }
    if (inputSchool === "") {
      console.log("All spells must have a valid school");
      return;
    }
    if (inputLevel === "") {
      console.log("All spells must have a valid level");
      return;
    }
    if (inputDurationQuantifier === "") {
      console.log("A duration quantifier must be chosen");
      return;
    }
    if (inputDuration === "") {
      console.log("Must have a valid duration");
      return;
    }
    if (inputDescription === "") {
      console.log("Can't have an empty description");
      return;
    }
    const newSpell = {
      userID: activeUserID,
      title: inputTitle,
      school: inputSchool,
      level: inputLevel,
      durationQuantifier: inputDurationQuantifier,
      duration: inputDuration,
      description: inputDescription,
    };
    console.log(newSpell);
    const newSavedSpells = [...savedSpells, newSpell];
    this.setState({
      savedSpells: newSavedSpells,
      inputTitle: "",
      inputSchool: "",
      inputLevel: "",
      inputDurationQuantifier: "",
      inputDuration: "",
      inputDescription: "",
    });
    this.props.onMessageUpdate("Spell Successfully Added");
  };

  onInputTitleChange = (event) => {
    this.setState({ inputTitle: event.target.value });
  };

  onInputSchoolChange = (event) => {
    this.setState({ inputSchool: event.target.value });
  };

  onInputLevelChange = (event) => {
    this.setState({ inputLevel: event.target.value });
  };

  onInputDurationQuantifierChange = (event) => {
    this.setState({ inputDurationQuantifier: event.target.value });
  };

  onInputDurationChange = (event) => {
    this.setState({ inputDuration: event.target.value });
  };

  onInputDescriptionChange = (event) => {
    this.setState({ inputDescription: event.target.value });
  };

  render() {
    return (
      <div className="background">
        <div className="window">
          <aside>
            <img src={icon} alt="User Icon" height="50" width="50" />
            <h3>{this.props.activeUserName}</h3>
          </aside>
          <main>
            <div className="SpellContainer">
              <h2>Container of Spells</h2>
              <div className="spell-form">
                <h3>Create a New Spell</h3>
                <input
                  type="text"
                  className="spell-title-box"
                  placeholder="Spell Title"
                  value={this.state.inputTitle}
                  onChange={this.onInputTitleChange}
                />
                <div className="spell-categorization">
                  <select
                    type="selection-box"
                    className="spell-level"
                    value={this.state.inputLevel}
                    onChange={this.onInputLevelChange}
                  >
                    <option value="">Spell Level</option>
                    <option value="Cantrip">Cantrip</option>
                    <option value="1st Level">1st Level</option>
                    <option value="2nd Level">2nd Level</option>
                    <option value="3rd Level">3rd Level</option>
                    <option value="4th Level">4th Level</option>
                    <option value="5th Level">5th Level</option>
                    <option value="6th Level">6th Level</option>
                    <option value="7th Level">7th Level</option>
                    <option value="8th Level">8th Level</option>
                    <option value="9th Level">9th Level</option>
                  </select>
                  <select
                    type="selection-box"
                    className="spell-school"
                    value={this.state.inputSchool}
                    onChange={this.onInputSchoolChange}
                  >
                    <option value="">Spell School</option>
                    <option value="Abjuration">Abjuration</option>
                    <option value="Conjuration">Conjuration</option>
                    <option value="Divination">Divination</option>
                    <option value="Dunamancy">Dunamancy</option>
                    <option value="Enchantment">Enchantment</option>
                    <option value="Evocation">Evocation</option>
                    <option value="Illusion">Illusion</option>
                    <option value="Necromancy">Necromancy</option>
                    <option value="Transmutation">Transmutation</option>
                  </select>
                </div>
                <div className="durations">
                  <select
                    type="selection-box"
                    className="duration-modifer"
                    value={this.state.inputDurationQuantifier}
                    onChange={this.onInputDurationQuantifierChange}
                  >
                    <option value="">Duration Quantifier</option>
                    <option value="--">--</option>
                    <option value="Concentration, Up to: ">
                      Concentration, Up to:
                    </option>
                    <option value="Until Dismissed, Up to: ">
                      Until Dismissed, Up to:
                    </option>
                  </select>
                  <select
                    type="selection-box"
                    className="duration"
                    value={this.state.inputDuration}
                    onChange={this.onInputDurationChange}
                  >
                    <option value="">Duration</option>
                    <option value="Instantaneous">Instantaneous</option>
                    <option value="1 Round">1 Round</option>
                    <option value="1 Minute">1 Minute</option>
                    <option value="10 Minutes">10 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="8 Hours">8 Hours</option>
                    <option value="1 Day">1 Day</option>
                    <option value="1 Month">1 Month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="spell-description-box"
                  placeholder="Spell Description"
                  value={this.state.inputDescription}
                  onChange={this.onInputDescriptionChange}
                />
                <button onClick={this.createSpell}>Submit</button>
              </div>
            </div>
          </main>
        </div>
        <button className="small-button">LogOut</button>
      </div>
    );
  }
}

MainPage.propTypes = {};

export default MainPage;
