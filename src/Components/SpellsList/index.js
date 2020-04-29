import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { get } from 'lodash';
import { Wrapper } from './styles';
// import CreateSpellForm from '../CreateSpellForm';
import ModifySpellForm from '../ModifySpellForm';
import { CREATE_SPELL } from '../App/PAGES';

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
    onMessageUpdate: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    onSavedSpellsUpdate: PropTypes.func.isRequired,
    savedSpells: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      savedSpells: this.props.savedSpells,
    };
  }

  toggleReadOnly = (index) => {
    // Create deep clone of saved spells.
    const clonedSpells = JSON.parse(JSON.stringify(this.state.savedSpells));

    // Modify read only state of
    clonedSpells[index].readOnly = !clonedSpells[index].readOnly;

    // Update state.
    this.props.onSavedSpellsUpdate(clonedSpells);
  };

  deleteSpell = (index) => {
    // Create deep clone of saved spells.
    const clonedSpells = JSON.parse(JSON.stringify(this.state.savedSpells));
    clonedSpells.splice(index, 1);
    // Update state.
    this.props.onSavedSpellsUpdate(clonedSpells);
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
                  defaultConcetration={concentration}
                  defaultDescription={description}
                  defaultDuration={duration}
                  defaultLevel={level}
                  defaultMaterialComponents={materialComponents}
                  defaultRange={range}
                  defaultRitual={ritual}
                  defaultSchool={school}
                  defaultSomaticComponents={somaticComponents}
                  defaultTitle={title}
                  defaultVerbalComponents={verbalComponents}
                  key={title}
                  savedSpells={savedSpells}
                  onMessageUpdate={this.props.onMessageUpdate}
                  onSavedSpellsUpdate={this.props.onSavedSpellsUpdate}
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
        <button
          type="button"
          onClick={() => {
            this.props.changePage(CREATE_SPELL);
          }}
        >
          Add a spell
        </button>
      </Wrapper>
    );
  }
}

export default SpellsList;
