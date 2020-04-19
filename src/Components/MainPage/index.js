import PropTypes from "prop-types";
import React, { Component } from "react";
import icon from "./userIcon.png";

import "./styles.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      inputTitle: "",
      inputSchool: "",
      inputLevel: "",
      inputConcentration: false,
      inputDuration: "",
      inputRitual: false,
      inputDescription: "",
      inputVerbal: false,
      inputMaterial: false,
      inputSomatic: false,
      savedSpells: [],
    };
  }

  componentDidMount() {
    const savedSpells = JSON.parse(localStorage.getItem("savedSpells")) || [];
    this.setState({ savedSpells });
    console.log("Saved Spells: ");
    console.log(savedSpells);
    window.addEventListener("beforeunload", this.onBeforeUnload);
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
      activeUserId,
      inputTitle,
      inputSchool,
      inputLevel,
      inputConcentration,
      inputDuration,
      inputRitual,
      inputDescription,
      inputVerbal,
      inputMaterial,
      inputSomatic,
      savedSpells,
    } = this.state;

    let spellAlreadyExists = false;
    savedSpells.forEach((element) => {
      if (element.userId === activeUserId && element.title === inputTitle) {
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

    if (activeUserId === "") {
      console.log("Error with User Id");
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
    if (inputDuration === "") {
      console.log("Must have a valid duration");
      return;
    }
    if (inputDescription === "") {
      console.log("Can't have an empty description");
      return;
    }
    const newSpell = {
      userId: activeUserId,
      title: inputTitle,
      school: inputSchool,
      level: inputLevel,
      duration: inputDuration,
      description: inputDescription,
      concentration: inputConcentration,
      ritual: inputRitual,
      verbalComponents: inputVerbal,
      somaticComponents: inputSomatic,
      materialComponents: inputMaterial,
    };
    const newSavedSpells = [...savedSpells, newSpell];
    this.setState({
      savedSpells: newSavedSpells,
      inputTitle: "",
      inputSchool: "",
      inputLevel: "",
      inputConcentration: false,
      inputDuration: "",
      inputRitual: false,
      inputDescription: "",
      inputVerbal: false,
      inputMaterial: false,
      inputSomatic: false,
    });
    this.props.onMessageUpdate("Spell Successfully Added");
  };

  generateSpellList = () => {
    const { savedSpells, activeUserId } = this.state;
    return savedSpells.map((spell) => {
      if (spell.userId === activeUserId) {
        return (
          <div className="spell" key={spell.title}>
            <span className="spell-title">{spell.title}</span>
            <div className="spell-details">
              <span>{spell.level}</span>
              <span>{spell.school}</span>
            </div>
          </div>
        );
      }
      return null;
    });
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

  onInputDurationChange = (event) => {
    this.setState({ inputDuration: event.target.value });
  };

  onInputDescriptionChange = (event) => {
    this.setState({ inputDescription: event.target.value });
  };

  onInputMaterialChange = (event) => {
    this.setState({ inputMaterial: event.target.value });
  };

  onInputSomaticChange = (event) => {
    this.setState({ inputSomatic: event.target.value });
  };

  onInputVerbalChange = (event) => {
    this.setState({ inputVerbal: event.target.value });
  };

  onInputConcentrationChange = (event) => {
    this.setState({ inputConcentration: event.target.value });
  };

  onInputRitualChange = (event) => {
    this.setState({ inputRitual: event.target.value });
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

                  <input
                    type="checkbox"
                    checked={this.state.inputConcentration}
                    onChange={this.onInputConcentrationChange}
                  />
                  <label>Concentration</label>

                  <input
                    type="checkbox"
                    checked={this.state.inputRitual}
                    onChange={this.onInputRitualChange}
                  />
                  <label>Ritual</label>
                </div>
                <div className="spell-components">
                  <input
                    type="checkbox"
                    checked={this.state.inputSomatic}
                    onChange={this.onInputSomaticChange}
                  />
                  <label>Somatic</label>
                  <input
                    type="checkbox"
                    checked={this.state.inputVerbal}
                    onChange={this.onInputVerbalChange}
                  />
                  <label>Verbal</label>
                  <input
                    type="checkbox"
                    checked={this.state.inputMaterial}
                    onChange={this.onInputMaterialChange}
                  />
                  <label>Material</label>
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

              <div className="spell-list">{this.generateSpellList()}</div>
            </div>
          </main>
        </div>
        <button className="small-button">LogOut</button>
      </div>
    );
  }
}

MainPage.propTypes = {
  activeUserId: PropTypes.number.isRequired,
  activeUserName: PropTypes.string.isRequired,
};

export default MainPage;
