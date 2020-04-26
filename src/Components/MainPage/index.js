import PropTypes from 'prop-types';
import React, { Component } from 'react';
import icon from './userIcon.png';
// import editIcon from '../../assets/edit.svg';

import { Wrapper } from './styles';
import CreateSpellForm from '../CreateSpellForm';
import ModifySpellForm from '../ModifySpellForm';

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

  deleteSpell = (index) => {
    // Create deep clone of saved spells.
    const updatedSpells = this.state.savedSpells;
    updatedSpells.splice(index, 1);
    // Update state.
    this.setState({ savedSpells: updatedSpells });
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
              <button className="unlock-icon" type="button" onClick={() => this.toggleReadOnly(index)}>
                Edit
              </button>
              <button className="delete-icon" type="button" onClick={() => this.deleteSpell(index)}>
                Delete
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
                <input checked={spell.concentration} readOnly type="checkbox" />
                <span>Concentration</span>
                <input checked={spell.ritual} readOnly type="checkbox" />
                <span>Ritual</span>
              </div>
              <div className="spell-detail">
                <input checked={spell.materialComponents} readOnly type="checkbox" />
                <span>Material</span>
                <input checked={spell.somaticComponents} readOnly type="checkbox" />
                <span>Somatic</span>
                <input checked={spell.verbalComponents} readOnly type="checkbox" />
                <span>Verbal</span>
              </div>
              <p className="spell-descript-text" readOnly>
                {spell.description}
              </p>
            </div>
          );
        }
        return (
          <ModifySpellForm
            activeUserId={activeUserId}
            defaultInputConcetration={spell.concentration}
            defaultInputDescription={spell.description}
            defaultInputDuration={spell.duration}
            defaultInputLevel={spell.level}
            defaultInputMaterial={spell.materialComponents}
            defaultInputRange={spell.range}
            defaultInputRitual={spell.ritual}
            defaultInputSchool={spell.school}
            defaultInputSomatic={spell.somaticComponents}
            defaultInputTitle={spell.title}
            defaultInputVerbal={spell.verbalComponents}
            key={spell.title}
            savedSpells={savedSpells}
            onMessageUpdate={this.props.onMessageUpdate}
            onSavedSpellsUpdate={this.onSavedSpellsUpdate}
          />
        );
      }
      return <p key={spell.title}>spell hidden</p>;
    });
  };

  render() {
    const { activeUserId, savedSpells } = this.state;
    return (
      <Wrapper>
        <div className="window">
          <aside>
            <img alt="User Icon" height="50" src={icon} width="50" />
            <h3>{this.props.activeUserName}</h3>
          </aside>
          <main>
            <div className="SpellContainer">
              <h2>Container of Spells</h2>
              <CreateSpellForm
                activeUserId={activeUserId}
                savedSpells={savedSpells}
                onMessageUpdate={this.props.onMessageUpdate}
                onSavedSpellsUpdate={this.onSavedSpellsUpdate}
              />
              <div className="spell-list">{this.generateSpellList()}</div>
            </div>
          </main>
        </div>
        <button className="small-button" type="button">
          LogOut
        </button>
      </Wrapper>
    );
  }
}

export default MainPage;
