import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Wrapper } from './styles';
import { SPELLS_LIST } from '../App/PAGES';

class CreateSpell extends Component {
  // type checking for props
  static propTypes = {
    activeUserId: PropTypes.number.isRequired,
    savedSpells: PropTypes.array.isRequired,
    onMessageUpdate: PropTypes.func.isRequired,
    onSavedSpellsUpdate: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
  };

  // constructor, set initial value for state variables to prop s
  constructor(props) {
    super(props);
    this.state = {
      activeUserId: this.props.activeUserId,
      title: '',
      school: '',
      level: '',
      concentration: false,
      duration: '',
      range: '',
      ritual: false,
      description: '',
      verbalComponents: false,
      materialComponents: false,
      somaticComponents: false,
    };
  }

  // creates a new spell and adds it to the array of saved spells
  createSpell = () => {
    // get all relevant state data (s from forms)
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

    // check to make sure that spell name isnt already taken for that user
    // set flag to false
    let spellAlreadyExists = false;

    // check each spell to make sure that name & user id combo is not already in user
    this.props.savedSpells.forEach((element) => {
      if (element.userId === activeUserId && element.title === title) {
        // if spell already exists, set flag and message
        this.props.onMessageUpdate(
          'Spell name is already taken, please try again',
        );
        spellAlreadyExists = true;
      }
    });

    // break out of creation if spell already exists
    if (spellAlreadyExists) {
      console.log('Spell name is already taken, please try again');
      this.props.onMessageUpdate('Spell already exists, please try again');
      return;
    }

    // break out of creation if there is an issue with the activeuserId
    if (activeUserId === '') {
      console.log('Error with User Id');
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if no title has been input
    if (title === '') {
      console.log("Can't have an empty title");
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if spell school wasnt set
    if (school === '') {
      console.log('All spells must have a valid school');
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if no level was selected
    if (level === '') {
      console.log('All spells must have a valid level');
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if no range was selected
    if (range === '') {
      console.log('All spells must have a valid range');
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if no duration was selected
    if (duration === '') {
      console.log('Must have a valid duration');
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // break out of creation if no description was input
    if (description === '') {
      console.log("Can't have an empty description");
      this.props.onMessageUpdate('All form fields are necessary');
      return;
    }

    // make a new spell using all the of input fields for its data
    const newSpell = {
      userId: activeUserId,
      title,
      school,
      level,
      duration,
      description,
      concentration,
      ritual,
      range,
      verbalComponents,
      somaticComponents,
      materialComponents,
      readOnly: true,
    };

    // make a new array of saved spells, with the existing array + our newly created spell
    const newSavedSpells = [...this.props.savedSpells, newSpell];

    // reset the input form to be "blank"
    this.setState({
      title: '',
      school: '',
      level: '',
      concentration: false,
      duration: '',
      range: '',
      ritual: false,
      description: '',
      verbalComponents: false,
      materialComponents: false,
      somaticComponents: false,
    });

    // set the message state and update saved spells
    this.props.onMessageUpdate('Spell Successfully Added');
    this.props.onSavedSpellsUpdate(newSavedSpells);
  };

  // function for updating all checkbox s
  onCheckboxChange = (key) => (event) => {
    this.setState({ [key]: event.target.checked });
  };

  // function for updating all regular input fields
  onchange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        {/* Title for form */}
        <h3>Create a New Spell</h3>
        {/* Spell Title Input */}
        <input
          className="spell-title-box"
          placeholder="Spell Title"
          type="text"
          value={this.state.title}
          onChange={this.onchange('title')}
        />
        {/* Spell Level and School */}
        <div className="spell-category-options">
          {/* Spell Level Selection */}
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

          {/* Spell School Selection */}
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
        {/* Spell Range Selection */}
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
        {/* Spell Duration Selection */}
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
        {/* Casting Modifier Checkboxes */}
        <div className="casting-modifier-options">
          {/* Concentration Checkbox */}
          <input
            checked={this.state.concentration}
            type="checkbox"
            onChange={this.onCheckboxChange('concentration')}
          />
          <span>Concentration</span>

          {/* Ritual Checkbox */}
          <input
            checked={this.state.ritual}
            type="checkbox"
            onChange={this.onCheckboxChange('ritual')}
          />
          <span>Ritual</span>
        </div>
        {/* Spell Components Checkboxes */}
        <div className="spell-components">
          {/* materialComponents Checkbox */}
          <input
            checked={this.state.materialComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('materialComponents')}
          />
          <span>Material</span>

          {/* somaticComponents Checkbox */}
          <input
            checked={this.state.somaticComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('somaticComponents')}
          />
          <span>Somatic</span>

          {/* verbalComponents Checkbox */}
          <input
            checked={this.state.verbalComponents}
            type="checkbox"
            onChange={this.onCheckboxChange('verbalComponents')}
          />

          <span>Verbal</span>
        </div>
        {/* Description Multi-line text box */}
        <textarea
          className="spell-description-box"
          placeholder="Spell Description"
          rows="5"
          value={this.state.description}
          onChange={this.onchange('description')}
        />
        {/* Create New Spell Button */}
        <button type="button" onClick={this.createSpell}>
          Submit
        </button>
        {/* Return to Spells List Button */}
        <button
          type="button"
          onClick={() => {
            this.props.changePage(SPELLS_LIST);
          }}
        >
          Go Back
        </button>
      </Wrapper>
    );
  }
}

export default CreateSpell;
