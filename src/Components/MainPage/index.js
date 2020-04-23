import PropTypes from "prop-types";
import React, { Component } from "react";
import icon from "./userIcon.png";
import editIcon from "../../assets/edit.svg";

import "./styles.css";
import SpellForm from "../SpellForm";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
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
    if (!this.props.dontSave) {
      const { savedSpells } = this.state;
      localStorage.setItem("savedSpells", JSON.stringify(savedSpells));
    }
    window.removeEventListener("beforeunload", this.setStateToLocalStorage);
  };

  onSavedSpellsUpdate = (savedSpells) => {
    this.setState({ savedSpells });
  };

  toggleReadOnly = (index) => {
    // Create deep clone of saved spells.
    const clonedSpells = JSON.parse(JSON.stringify(this.state.savedSpells));

    // Modify read only state of spell.
    clonedSpells[index].readOnly = !clonedSpells[index].readOnly;

    // Update state.
    this.setState({ savedSpells: clonedSpells });
  };

  generateSpellList = () => {
    const { savedSpells, activeUserId } = this.state;

    return savedSpells.map((spell, index) => {
      if (spell.userId === activeUserId) {
        if (spell.readOnly) {
          return (
            <div className="spell" key={spell.title}>
              {/* Title */}
              <span className="spell-title">{spell.title}</span>

              {/* Edit Icon */}
              <img
                alt="unlock icon"
                src={editIcon}
                className="unlock-icon"
                onClick={() => this.toggleReadOnly(index)}
              />

              <div className="spell-detail">
                <span>{spell.level}</span>
                <span> - </span>
                <span>{spell.school}</span>
              </div>
              <div className="spell-detail">
                <label>Duration: </label>
                <span>{spell.duration}</span>
              </div>
              <div className="spell-detail">
                <label>Range: </label>
                <span>{spell.range}</span>
              </div>
              <div className="spell-detail">
                <input type="checkbox" checked={spell.concentration} readOnly />
                <label>Concentration</label>
                <input type="checkbox" checked={spell.ritual} readOnly />
                <label>Ritual</label>
              </div>
              <div className="spell-detail">
                <input
                  type="checkbox"
                  checked={spell.materialComponents}
                  readOnly
                />
                <label>Material</label>
                <input
                  type="checkbox"
                  checked={spell.somaticComponents}
                  readOnly
                />
                <label>Somatic</label>
                <input
                  type="checkbox"
                  checked={spell.verbalComponents}
                  readOnly
                />
                <label>Verbal</label>
              </div>
              <p className="spell-descript-text" readOnly>
                {spell.description}
              </p>
            </div>
          );
        }
        return <p key={spell.title}>spell is not read only</p>;
      }
      return <p key={spell.title}>spell hidden</p>;
    });
  };

  render() {
    const { activeUserId, savedSpells } = this.state;
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
              <SpellForm
                savedSpells={savedSpells}
                activeUserId={activeUserId}
                onSavedSpellsUpdate={this.onSavedSpellsUpdate}
                onMessageUpdate={this.props.onMessageUpdate}
              />
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
