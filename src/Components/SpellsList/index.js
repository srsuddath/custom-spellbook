import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { get } from 'lodash';
import { Wrapper } from './styles';
// import CreateSpellForm from '../CreateSpellForm';
import ModifySpellForm from '../ModifySpellForm';
import alchemyIcon from '../../assets/alchemy.svg';
import crystalBallIcon from '../../assets/crystal-ball.svg';
import eyeIcon from '../../assets/eye.svg';
import fireIcon from '../../assets/fire.svg';
import galaxyIcon from '../../assets/galaxy.svg';
import shieldIcon from '../../assets/shield.svg';
import skullIcon from '../../assets/skull.svg';
import wandIcon from '../../assets/wand.svg';

class SpellsList extends Component {
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
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

    // Modify read only state of
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

  deriveSchoolIcon = (school) => {
    if (school === 'Abjuration') {
      return shieldIcon;
    }
    if (school === 'Conjuration') {
      return galaxyIcon;
    }
    if (school === 'Divination') {
      return crystalBallIcon;
    }
    if (school === 'Enchantment') {
      return wandIcon;
    }
    if (school === 'Evocation') {
      return fireIcon;
    }
    if (school === 'Illusion') {
      return eyeIcon;
    }
    if (school === 'Necromancy') {
      return skullIcon;
    }
    if (school === 'Transmutation') {
      return alchemyIcon;
    }
  };

  render() {
    const { savedSpells, activeUserId } = this.state;
    return (
      <Wrapper>
        <div className="spell-list">
          {savedSpells.map((spell, index) => {
            // Derive spell properties.
            const concentration = get(spell, 'concentration');
            const description = get(spell, 'description');
            const duration = get(spell, 'duration');
            const level = get(spell, 'level');
            const materialComponents = get(spell, 'materialComponents');
            const range = get(spell, 'range');
            const readOnly = get(spell, 'readOnly');
            const ritual = get(spell, 'ritual');
            const school = get(spell, 'school');
            const somaticComponents = get(spell, 'somaticComponents');
            const title = get(spell, 'title');
            const userId = get(spell, 'userId');
            const verbalComponents = get(spell, 'verbalComponents');

            if (userId !== activeUserId) {
              return null;
            }

            if (!readOnly) {
              return (
                <ModifySpellForm
                  activeUserId={activeUserId}
                  defaultInputConcetration={concentration}
                  defaultInputDescription={description}
                  defaultInputDuration={duration}
                  defaultInputLevel={level}
                  defaultInputMaterial={materialComponents}
                  defaultInputRange={range}
                  defaultInputRitual={ritual}
                  defaultInputSchool={school}
                  defaultInputSomatic={somaticComponents}
                  defaultInputTitle={title}
                  defaultInputVerbal={verbalComponents}
                  key={title}
                  savedSpells={savedSpells}
                  onMessageUpdate={this.props.onMessageUpdate}
                  onSavedSpellsUpdate={this.onSavedSpellsUpdate}
                />
              );
            }

            return (
              <div className="spell" key={title}>
                <div className="spell-header">
                  <img
                    alt="Spell School Icon"
                    src={this.deriveSchoolIcon(school)}
                  />
                  {/* Title */}
                  <span className="spell-title">{title}</span>
                  <div>
                    {/* Edit Icon */}
                    <button
                      className="unlock-icon"
                      type="button"
                      onClick={() => this.toggleReadOnly(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-icon"
                      type="button"
                      onClick={() => this.deleteSpell(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div>
                  <span>{level}</span>
                  <span> - </span>
                  <span>{school}</span>
                </div>
                <div>
                  <span>Duration: </span>
                  <span>{duration}</span>
                </div>
                <div>
                  <span>Range: </span>
                  <span>{range}</span>
                </div>
                <div>
                  <input checked={concentration} readOnly type="checkbox" />
                  <span>Concentration</span>
                  <input checked={ritual} readOnly type="checkbox" />
                  <span>Ritual</span>
                </div>
                <div>
                  <input
                    checked={materialComponents}
                    readOnly
                    type="checkbox"
                  />
                  <span>Material</span>
                  <input checked={somaticComponents} readOnly type="checkbox" />
                  <span>Somatic</span>
                  <input checked={verbalComponents} readOnly type="checkbox" />
                  <span>Verbal</span>
                </div>
                <p className="spell-descript-text" readOnly>
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }
}

export default SpellsList;
