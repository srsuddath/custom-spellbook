import PropTypes from 'prop-types';
import React, { Component } from 'react';
import icon from './userIcon.png';
import editIcon from '../../assets/edit.svg';

import './styles.css';
import CreateSpellForm from '../CreateSpellForm';

class MainPage extends Component {
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
    activeUserName: PropTypes.string.isRequired,
    dontSave: PropTypes.bool,
    onMessageUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      savedSpells: [],
    };
  }

  componentDidMount() {
    const savedSpells = JSON.parse(localStorage.getItem('savedSpells')) || [];
    this.setState({ savedSpells });
    console.log('Saved Spells: ');
    console.log(savedSpells);
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    this.onBeforeUnload();
  }

  onBeforeUnload = () => {
    if (!this.props.dontSave) {
      const { savedSpells } = this.state;
      localStorage.setItem('savedSpells', JSON.stringify(savedSpells));
    }
    window.removeEventListener('beforeunload', this.setStateToLocalStorage);
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
              {/* <img
                alt="unlock icon"
                src={editIcon}
                className="unlock-icon"
                onClick={() => this.toggleReadOnly(index)}
              /> */}
              <button
                type="button"
                alt="unlock icon"
                src={editIcon}
                className="unlock-icon"
                onClick={() => this.toggleReadOnly(index)}
              >
                Edit
              </button>
              <div className="spell-detail">
                <span>{spell.level}</span>
                <span> - </span>
                <span>{spell.school}</span>
              </div>
              <div className="spell-detail">
                <span>Duration: </span>
                <span>{spell.duration}</span>
              </div>
              <div className="spell-detail">
                <span>Range: </span>
                <span>{spell.range}</span>
              </div>
              <div className="spell-detail">
                <input type="checkbox" checked={spell.concentration} readOnly />
                <span>Concentration</span>
                <input type="checkbox" checked={spell.ritual} readOnly />
                <span>Ritual</span>
              </div>
              <div className="spell-detail">
                <input type="checkbox" checked={spell.materialComponents} readOnly />
                <span>Material</span>
                <input type="checkbox" checked={spell.somaticComponents} readOnly />
                <span>Somatic</span>
                <input type="checkbox" checked={spell.verbalComponents} readOnly />
                <span>Verbal</span>
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
              <CreateSpellForm
                savedSpells={savedSpells}
                activeUserId={activeUserId}
                onSavedSpellsUpdate={this.onSavedSpellsUpdate}
                onMessageUpdate={this.props.onMessageUpdate}
              />
              <div className="spell-list">{this.generateSpellList()}</div>
            </div>
          </main>
        </div>
        <button type="button" className="small-button">
          LogOut
        </button>
      </div>
    );
  }
}

export default MainPage;
