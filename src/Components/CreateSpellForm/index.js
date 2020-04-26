import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './styles.css';

class CreateSpellForm extends Component {
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
    savedSpells: PropTypes.array.isRequired,
    defaultInputTitle: PropTypes.string,
    defaultInputSchool: PropTypes.string,
    defaultInputLevel: PropTypes.string,
    defaultInputConcetration: PropTypes.bool,
    defaultInputDuration: PropTypes.string,
    defaultInputRange: PropTypes.string,
    defaultInputRitual: PropTypes.bool,
    defaultInputDescription: PropTypes.string,
    defaultInputVerbal: PropTypes.bool,
    defaultInputMaterial: PropTypes.bool,
    defaultInputSomatic: PropTypes.bool,
    onMessageUpdate: PropTypes.func,
    onSavedSpellsUpdate: PropTypes.func,
  };

  static defaultProps = {
    defaultInputTitle: '',
    defaultInputSchool: '',
    defaultInputLevel: '',
    defaultInputConcetration: false,
    defaultInputDuration: '',
    defaultInputRange: '',
    defaultInputRitual: false,
    defaultInputDescription: '',
    defaultInputVerbal: false,
    defaultInputMaterial: false,
    defaultInputSomatic: false,
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

  componentDidMount() {}

  componentWillUnmount() {}

  createSpell = () => {
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

    let spellAlreadyExists = false;
    this.props.savedSpells.forEach((element) => {
      if (element.userId === activeUserId && element.title === inputTitle) {
        this.props.onMessageUpdate('Spell name is already taken, please try again');
        spellAlreadyExists = true;
      }
    });

    if (spellAlreadyExists) {
      console.log('Spell name is already taken, please try again');
      return;
    }
    if (activeUserId === '') {
      console.log('Error with User Id');
      return;
    }
    if (inputTitle === '') {
      console.log("Can't have an empty title");
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
      range: inputRange,
      verbalComponents: inputVerbal,
      somaticComponents: inputSomatic,
      materialComponents: inputMaterial,
      readOnly: true,
    };
    const newSavedSpells = [...this.props.savedSpells, newSpell];

    this.setState({
      inputTitle: '',
      inputSchool: '',
      inputLevel: '',
      inputConcentration: false,
      inputDuration: '',
      inputRange: '',
      inputRitual: false,
      inputDescription: '',
      inputVerbal: false,
      inputMaterial: false,
      inputSomatic: false,
    });
    this.props.onMessageUpdate('Spell Successfully Added');
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
      <div className="spell-form">
        <h3>Create a New Spell</h3>
        <input
          type="text"
          className="spell-title-box"
          placeholder="Spell Title"
          value={this.state.inputTitle}
          onChange={this.onInputChange('inputTitle')}
        />
        <div className="spell-category-options">
          <select
            type="selection-box"
            className="spell-level"
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
            type="selection-box"
            className="spell-school"
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
            type="selection-box"
            className="range"
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
            type="selection-box"
            className="duration"
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
            type="checkbox"
            checked={this.state.inputConcentration}
            onChange={this.onCheckboxChange('inputConcentration')}
          />
          <span>Concentration</span>
          <input type="checkbox" checked={this.state.inputRitual} onChange={this.onCheckboxChange('inputRitual')} />
          <span>Ritual</span>
        </div>
        <div className="spell-components">
          <input type="checkbox" checked={this.state.inputMaterial} onChange={this.onCheckboxChange('inputMaterial')} />
          <span>Material</span>
          <input type="checkbox" checked={this.state.inputSomatic} onChange={this.onCheckboxChange('inputSomatic')} />
          <span>Somatic</span>
          <input type="checkbox" checked={this.state.inputVerbal} onChange={this.onCheckboxChange('inputVerbal')} />
          <span>Verbal</span>
        </div>
        <textarea
          className="spell-description-box"
          placeholder="Spell Description"
          rows="5"
          value={this.state.inputDescription}
          onChange={this.onInputChange('inputDescription')}
        />
        <button type="button" onClick={this.createSpell}>
          Submit
        </button>
      </div>
    );
  }
}

export default CreateSpellForm;
