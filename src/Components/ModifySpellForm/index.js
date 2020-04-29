import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Wrapper } from './styles';

class ModifySpellForm extends Component {
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
    defaultConcetration: PropTypes.bool.isRequired,
    defaultDescription: PropTypes.string.isRequired,
    defaultDuration: PropTypes.string.isRequired,
    defaultLevel: PropTypes.string.isRequired,
    defaultMaterialComponents: PropTypes.bool.isRequired,
    defaultRange: PropTypes.string.isRequired,
    defaultRitual: PropTypes.bool.isRequired,
    defaultSchool: PropTypes.string.isRequired,
    defaultSomaticComponents: PropTypes.bool.isRequired,
    defaultTitle: PropTypes.string.isRequired,
    defaultVerbalComponents: PropTypes.bool.isRequired,
    onMessageUpdate: PropTypes.func.isRequired,
    onSavedSpellsUpdate: PropTypes.func.isRequired,
    savedSpells: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      concentration: this.props.defaultConcetration,
      description: this.props.defaultDescription,
      duration: this.props.defaultDuration,
      level: this.props.defaultLevel,
      materialComponents: this.props.defaultMaterialComponents,
      range: this.props.defaultRange,
      ritual: this.props.defaultRitual,
      school: this.props.defaultSchool,
      somaticComponents: this.props.defaultSomaticComponents,
      title: this.props.defaultTitle,
      verbalComponents: this.props.defaultVerbalComponents,
    };
  }

  updateSpell = () => {
    const {
      activeUserId,
      title,
      school,
      level,
      concentration,
      duration,
      ritual,
      range,
      description,
      verbalComponents,
      materialComponents,
      somaticComponents,
    } = this.state;

    if (activeUserId === '') {
      console.log('Error with User Id');
      return;
    }
    if (school === '') {
      console.log('All spells must have a valid school');
      return;
    }
    if (level === '') {
      console.log('All spells must have a valid level');
      return;
    }
    if (range === '') {
      console.log('All spells must have a valid range');
      return;
    }
    if (duration === '') {
      console.log('Must have a valid duration');
      return;
    }
    if (description === '') {
      console.log("Can't have an empty description");
      return;
    }

    const updatedSpell = {
      concentration,
      description,
      duration,
      level,
      materialComponents,
      range,
      readOnly: true,
      ritual,
      school,
      somaticComponents,
      title,
      userId: activeUserId,
      verbalComponents,
    };

    const newSavedSpells = this.props.savedSpells.map((spell) => {
      if (spell.title === title && spell.userId === activeUserId) {
        return updatedSpell;
      }
      return spell;
    });

    this.props.onMessageUpdate('Spell Successfully Updated');
    this.props.onSavedSpellsUpdate(newSavedSpells);
  };

  onCheckboxChange = (key) => (event) => {
    this.setState({ [key]: event.target.checked });
  };

  onchange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <span>{this.state.title}</span>
        <div className="spell-category-options">
          <select
            className="spell-level"
            type="selection-box"
            value={this.state.level}
            onChange={this.onchange('level')}
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
            className="spell-school"
            type="selection-box"
            value={this.state.school}
            onChange={this.onchange('school')}
          >
            <option value="">Spell School</option>
            <option value="Abjuration">Abjuration</option>
            <option value="Conjuration">Conjuration</option>
            <option value="Divination">Divination</option>
            <option value="Enchantment">Enchantment</option>
            <option value="Evocation">Evocation</option>
            <option value="Illusion">Illusion</option>
            <option value="Necromancy">Necromancy</option>
            <option value="Transmutation">Transmutation</option>
          </select>
        </div>
        <div className="range-selection-options">
          <select
            className="range"
            type="selection-box"
            value={this.state.range}
            onChange={this.onchange('range')}
          >
            <option value="">Range</option>
            <option value="Touch">Touch</option>
            <option value="15 Feet">15 Feet</option>
            <option value="30 Feet">30 Feet</option>
            <option value="60 Feet">60 Feet</option>
            <option value="120 Feet">120 Feet</option>
            <option value="500 Feet">500 Feet</option>
            <option value="1 Mile">1 Mile</option>
            <option value="10 Miles">10 Miles</option>
          </select>
        </div>
        <div className="duration-selection-options">
          <select
            className="duration"
            type="selection-box"
            value={this.state.duration}
            onChange={this.onchange('duration')}
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
        <div className="casting-modifier-options">
          <input
            checked={this.state.concentration}
            type="checkbox"
            onChange={this.onCheckboxChange('concentration')}
          />
          <span>Concentration</span>
          <input
            checked={this.state.ritual}
            type="checkbox"
            onChange={this.onCheckboxChange('ritual')}
          />
          <span>Ritual</span>
        </div>
        <div className="spell-components">
          <input
            checked={this.state.materialComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('materialComponents')}
          />
          <span>Material</span>
          <input
            checked={this.state.somaticComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('somaticComponents')}
          />
          <span>Somatic</span>
          <input
            checked={this.state.verbalComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('verbalComponents')}
          />
          <span>Verbal</span>
        </div>
        <textarea
          className="spell-description-box"
          placeholder="Spell Description"
          rows="5"
          value={this.state.description}
          onChange={this.onchange('description')}
        />
        <button type="button" onClick={this.updateSpell}>
          Update
        </button>
      </Wrapper>
    );
  }
}

export default ModifySpellForm;
