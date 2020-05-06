import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { get } from 'lodash';
import { Wrapper } from './styles';
// import CreateSpellForm from '../CreateSpellForm';
import ModifySpellForm from '../ModifySpellForm';
import { CREATE_SPELL } from '../App/PAGES';

import Alchemy from '../../assets/Alchemy';
import CrystalBall from '../../assets/CrystalBall';
import Eye from '../../assets/Eye';
import Fire from '../../assets/Fire';
import Galaxy from '../../assets/Galaxy';
import Shield from '../../assets/Shield';
import Skull from '../../assets/Skull';
import Wand from '../../assets/Wand';
import ExpandIcon from '../../assets/Expand';
import EditIcon from '../../assets/Edit';
import TrashIcon from '../../assets/Trash';

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
      expandedSpellsLookup: {},
      deletedSpell: {},
    };
  }

  toggleReadOnly = (index) => {
    // Create deep clone of saved spells.
    const clonedSpells = JSON.parse(JSON.stringify(this.props.savedSpells));

    // Modify read only state of
    clonedSpells[index].readOnly = !clonedSpells[index].readOnly;

    // Update state.
    this.props.onSavedSpellsUpdate(clonedSpells);
  };

  deleteSpell = (index) => {
    // Create deep clone of saved spells.
    const clonedSpells = JSON.parse(JSON.stringify(this.props.savedSpells));
    const deletedSpell = clonedSpells.splice(index, 1)[0];
    // Update state.
    this.props.onSavedSpellsUpdate(clonedSpells);
    this.setState({ deletedSpell });
  };

  undoDelete = () => {
    const newSavedSpells = [...this.props.savedSpells, this.state.deletedSpell];
    this.setState({ deletedSpell: {} });
    this.props.onSavedSpellsUpdate(newSavedSpells);
  };

  deriveSchoolIcon = (school) => {
    if (school === 'Abjuration') {
      return Shield;
    }
    if (school === 'Conjuration') {
      return Galaxy;
    }
    if (school === 'Divination') {
      return CrystalBall;
    }
    if (school === 'Enchantment') {
      return Wand;
    }
    if (school === 'Evocation') {
      return Fire;
    }
    if (school === 'Illusion') {
      return Eye;
    }
    if (school === 'Necromancy') {
      return Skull;
    }
    if (school === 'Transmutation') {
      return Alchemy;
    }
  };

  deriveLevelIcon(level) {
    if (level === 'Cantrip') {
      return '0th';
    }
    if (level === '1st Level') {
      return '1st';
    }
    if (level === '2nd Level') {
      return '2nd';
    }
    if (level === '3rd Level') {
      return '3rd';
    }
    if (level === '4th Level') {
      return '4th';
    }
    if (level === '5th Level') {
      return '5th';
    }
    if (level === '6th Level') {
      return '6th';
    }
    if (level === '7th Level') {
      return '7th';
    }
    if (level === '8th Level') {
      return '8th';
    }
    if (level === '9th Level') {
      return '9th';
    }
  }

  deriveCastingSpeedIcon = (castingSpeed) => {
    if (castingSpeed === '1 Action') {
      return 'A';
    }
    if (castingSpeed === '1 Bonus Action') {
      return 'BA';
    }
    if (castingSpeed === '1 Minute') {
      return '1m';
    }
    if (castingSpeed === '10 Minutes') {
      return '10m';
    }
    if (castingSpeed === '1 Hour') {
      return '1h';
    }
    if (castingSpeed === '8 Hours') {
      return '8h';
    }
  };

  toggleSpellExpansion = (id) => {
    const expandedSpellsLookup = {
      ...this.state.expandedSpellsLookup,
      [id]: !this.state.expandedSpellsLookup[id],
    };
    this.setState({ expandedSpellsLookup });
  };

  render() {
    const { activeUserId, expandedSpellsLookup, deletedSpell } = this.state;
    return (
      <Wrapper>
        <button
          className="header-button"
          type="button"
          onClick={() => {
            this.props.changePage(CREATE_SPELL);
          }}
        >
          Add a spell
        </button>

        <button
          type="button"
          className={`${
            Object.keys(deletedSpell).length === 0 ? ' hidden' : ''
          }`}
          onClick={this.undoDelete}
        >
          Undo Delete
        </button>

        {this.props.savedSpells.map((spell, index) => {
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
          const castingSpeed = get(spell, 'castingSpeed');
          const somaticComponents = get(spell, 'somaticComponents');
          const title = get(spell, 'title');
          const userId = get(spell, 'userId');
          const verbalComponents = get(spell, 'verbalComponents');
          const id = get(spell, 'id');

          // Derive if the spell is expanded.
          const isExpanded = get(expandedSpellsLookup, `[${id}]`, false);

          // Derive school icon
          const SchoolIcon = this.deriveSchoolIcon(school);

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
                defaultCastingSpeed={castingSpeed}
                defaultSomaticComponents={somaticComponents}
                defaultTitle={title}
                defaultVerbalComponents={verbalComponents}
                key={id}
                savedSpells={this.props.savedSpells}
                onMessageUpdate={this.props.onMessageUpdate}
                onSavedSpellsUpdate={this.props.onSavedSpellsUpdate}
              />
            );
          }

          return (
            <div className="spell" key={id}>
              <div className="spell-header">
                <div className="spell-reference">
                  <SchoolIcon />
                  <span
                    className={`${!isExpanded ? 'reference-icon' : ' hidden'}`}
                  >
                    {this.deriveLevelIcon(level)}
                  </span>
                  <span
                    className={`${!isExpanded ? 'reference-icon' : ' hidden'}`}
                  >
                    {this.deriveCastingSpeedIcon(castingSpeed)}
                  </span>
                  <span
                    className={`bigger-text${
                      concentration && !isExpanded
                        ? ' reference-icon'
                        : ' hidden'
                    }`}
                  >
                    C
                  </span>
                  <span
                    className={`bigger-text${
                      ritual && !isExpanded ? ' reference-icon' : ' hidden'
                    }`}
                  >
                    R
                  </span>
                </div>
                {/* Title */}
                <span className="spell-title">{title}</span>
                <div className="spell-buttons">
                  <div
                    className={`spell-other-buttons${
                      isExpanded ? '' : ' hidden'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => this.toggleReadOnly(index)}
                    >
                      <EditIcon className="icon-button" />
                    </button>
                    <button
                      type="button"
                      onClick={() => this.deleteSpell(index)}
                    >
                      <TrashIcon className="icon-button" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => this.toggleSpellExpansion(id)}
                  >
                    <ExpandIcon
                      className={`icon-button chevron${
                        isExpanded ? '' : ' rotate'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className={`spell-details${isExpanded ? '' : ' hidden'}`}>
                <div className="top-spell-details">
                  <div>
                    <span>{level}</span>
                    <span> - </span>
                    <span>{school}</span>
                  </div>
                  <div>
                    <span>Casting Speed: </span>
                    <span>{castingSpeed}</span>
                  </div>
                  <div>
                    <span>Duration: </span>
                    <span>{duration}</span>
                  </div>

                  <div>
                    <span>Range: </span>
                    <span>{range}</span>
                  </div>
                </div>
                <div className="lower-spell-details">
                  <div>
                    <input checked={concentration} readOnly type="checkbox" />
                    <span>Concentration</span>
                    <input checked={ritual} readOnly type="checkbox" />
                    <span>Ritual</span>
                  </div>
                  <div className="spell-components">
                    <input
                      checked={materialComponents}
                      readOnly
                      type="checkbox"
                    />
                    <span>Material</span>
                    <input
                      checked={somaticComponents}
                      readOnly
                      type="checkbox"
                    />
                    <span>Somatic</span>
                    <input
                      checked={verbalComponents}
                      readOnly
                      type="checkbox"
                    />
                    <span>Verbal</span>
                  </div>
                </div>
                <p className="spell-description">{description}</p>
              </div>
            </div>
          );
        })}
      </Wrapper>
    );
  }
}

export default SpellsList;
