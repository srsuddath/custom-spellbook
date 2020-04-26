import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Wrapper } from './styles';

class ModifySpellForm extends Component {
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
    savedSpells: PropTypes.array.isRequired,
    defaultInputTitle: PropTypes.string.isRequired,
    defaultInputSchool: PropTypes.string.isRequired,
    defaultInputLevel: PropTypes.string.isRequired,
    defaultInputConcetration: PropTypes.bool.isRequired,
    defaultInputDuration: PropTypes.string.isRequired,
    defaultInputRange: PropTypes.string.isRequired,
    defaultInputRitual: PropTypes.bool.isRequired,
    defaultInputDescription: PropTypes.string.isRequired,
    defaultInputVerbal: PropTypes.bool.isRequired,
    defaultInputMaterial: PropTypes.bool.isRequired,
    defaultInputSomatic: PropTypes.bool.isRequired,
    onMessageUpdate: PropTypes.func.isRequired,
    onSavedSpellsUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      inputTitle: this.props.defaultInputTitle,
      inputSchool: this.props.defaultInputSchool,
      inputLevel: this.props.defaultInputLevel,
      inputConcentration: this.props.defaultInputConcetration,
      inputDuration: this.props.defaultInputDuration,
      inputRange: this.props.defaultInputRange,
      inputRitual: this.props.defaultInputRitual,
      inputDescription: this.props.defaultInputDescription,
      inputVerbal: this.props.defaultInputVerbal,
      inputMaterial: this.props.defaultInputMaterial,
      inputSomatic: this.props.defaultInputSomatic,
    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  updateSpell = () => {
    const {
      activeUserId,
      inputTitle,
      inputSchool,
      inputLevel,
      inputConcentration,
      inputDuration,
      inputRitual,
      inputRange,
      inputDescription,
      inputVerbal,
      inputMaterial,
      inputSomatic,
    } = this.state;

    if (activeUserId === '') {
      console.log('Error with User Id');
      return;
    }
    if (inputSchool === '') {
      console.log('All spells must have a valid school');
      return;
    }
    if (inputLevel === '') {
      console.log('All spells must have a valid level');
      return;
    }
    if (inputRange === '') {
      console.log('All spells must have a valid range');
      return;
    }
    if (inputDuration === '') {
      console.log('Must have a valid duration');
      return;
    }
    if (inputDescription === '') {
      console.log('Can\'t have an empty description');
      return;
    }

    const updatedSpell = {
      userId: activeUserId,
      title: inputTitle,
      school: inputSchool,
      level: inputLevel,
      duration: inputDuration,
      description: inputDescription,
      concentration: inputConcentration,
      ritual: inputRitual,
      range: inputRange,
      verbalComponents: inputVerbal,
      somaticComponents: inputSomatic,
      materialComponents: inputMaterial,
      readOnly: true,
    };

    const newSavedSpells = this.props.savedSpells.map((spell) => {
      if (spell.title === inputTitle && spell.userId === activeUserId) {
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

  onInputChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <h3>Create a New Spell</h3>
        <span>{this.state.inputTitle}</span>
        <div className="spell-category-options">
          <select
            className="spell-level"
            type="selection-box"
            value={this.state.inputLevel}
            onChange={this.onInputChange('inputLevel')}
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
            value={this.state.inputSchool}
            onChange={this.onInputChange('inputSchool')}
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
        <div className="range-selection-options">
          <select
            className="range"
            type="selection-box"
            value={this.state.inputRange}
            onChange={this.onInputChange('inputRange')}
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
            value={this.state.inputDuration}
            onChange={this.onInputChange('inputDuration')}
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
            checked={this.state.inputConcentration}
            type="checkbox"
            onChange={this.onCheckboxChange('inputConcentration')}
          />
          <span>Concentration</span>
          <input
            checked={this.state.inputRitual}
            type="checkbox"
            onChange={this.onCheckboxChange('inputRitual')}
          />
          <span>Ritual</span>
        </div>
        <div className="spell-components">
          <input
            checked={this.state.inputMaterial}
            type="checkbox"
            onChange={this.onCheckboxChange('inputMaterial')}
          />
          <span>Material</span>
          <input
            checked={this.state.inputSomatic}
            type="checkbox"
            onChange={this.onCheckboxChange('inputSomatic')}
          />
          <span>Somatic</span>
          <input
            checked={this.state.inputVerbal}
            type="checkbox"
            onChange={this.onCheckboxChange('inputVerbal')}
          />
          <span>Verbal</span>
        </div>
        <textarea
          className="spell-description-box"
          placeholder="Spell Description"
          rows="5"
          value={this.state.inputDescription}
          onChange={this.onInputChange('inputDescription')}
        />
        <button
          type="button"
          onClick={this.updateSpell}
        >
          Update
        </button>
      </Wrapper>
    );
  }
}

export default ModifySpellForm;
