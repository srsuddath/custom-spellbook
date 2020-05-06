import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      castingSpeed: '',
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
      castingSpeed,
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
    // break out of creation if no casting speed has been input
    if (castingSpeed === '') {
      console.log("Can't have an empty casting speed");
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
      castingSpeed,
      ritual,
      range,
      verbalComponents,
      somaticComponents,
      materialComponents,
      readOnly: true,
      id: uuidv4(),
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
      castingSpeed: '',
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

  // function for updating all checkboxs
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
        <div className="new-spell-form">
          {/* Title for form */}
          <h3>Create a New Spell</h3>
          {/* Spell Title Input */}
          <input
            className="spell-title"
            placeholder="Spell Title"
            type="text"
            value={this.state.title}
            onChange={this.onchange('title')}
          />
          <select
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
          <select
            type="selection-box"
            value={this.state.castingSpeed}
            onChange={this.onchange('castingSpeed')}
          >
            <option value="">Casting Speed</option>
            <option value="1 Action">Casting Speed: 1 Action</option>
            <option value="1 Bonus Action">
              Casting Speed: 1 Bonus Action
            </option>
            <option value="1 Minute">Casting Speed: 1 Minute</option>
            <option value="10 Minutes">Casting Speed: 10 Minutes</option>
            <option value="1 Hour">Casting Speed: 1 Hour</option>
            <option value="8 Hours">Casting Speed: 8 Hours</option>
          </select>
          {/* Spell Range Selection */}
          <select
            type="selection-box"
            value={this.state.range}
            onChange={this.onchange('range')}
          >
            <option value="">Range</option>
            <option value="Touch">Range: Touch</option>
            <option value="15 Feet">Range: 15 Feet</option>
            <option value="30 Feet">Range: 30 Feet</option>
            <option value="60 Feet">Range: 60 Feet</option>
            <option value="120 Feet">Range: 120 Feet</option>
            <option value="500 Feet">Range: 500 Feet</option>
            <option value="1 Mile">Range: 1 Mile</option>
            <option value="10 Miles">Range: 10 Miles</option>
          </select>
          {/* Spell Duration Selection */}
          <select
            type="selection-box"
            value={this.state.duration}
            onChange={this.onchange('duration')}
          >
            <option value="">Duration</option>
            <option value="Instantaneous">Duration: Instantaneous</option>
            <option value="1 Round">Duration: 1 Round</option>
            <option value="1 Minute">Duration: 1 Minute</option>
            <option value="10 Minutes">Duration: 10 Minutes</option>
            <option value="1 Hour">Duration: 1 Hour</option>
            <option value="8 Hours">Duration: 8 Hours</option>
            <option value="1 Day">Duration: 1 Day</option>
            <option value="1 Month">Duration: 1 Month</option>
            <option value="1 Year">Duration: 1 Year</option>
          </select>
          <div className="casting-modifiers">
            <input
              className="checkbox"
              checked={this.state.concentration}
              type="checkbox"
              onChange={this.onCheckboxChange('concentration')}
            />
            <span className="label">Concentration</span>
            <input
              className="checkbox"
              checked={this.state.ritual}
              type="checkbox"
              onChange={this.onCheckboxChange('ritual')}
            />
            <span className="label">Ritual</span>
          </div>

          <div className="spell-components">
            <input
              className="checkbox"
              checked={this.state.materialComponents}
              type="checkbox"
              onChange={this.onCheckboxChange('materialComponents')}
            />
            <span className="label">Material</span>
            <input
              className="checkbox"
              checked={this.state.somaticComponents}
              type="checkbox"
              onChange={this.onCheckboxChange('somaticComponents')}
            />
            <span className="label">Somatic</span>
            <input
              className="checkbox"
              checked={this.state.verbalComponents}
              type="checkbox"
              onChange={this.onCheckboxChange('verbalComponents')}
            />
            <span className="label">Verbal</span>
          </div>
          <textarea
            className="spell-description"
            placeholder="  Spell Description..."
            value={this.state.description}
            onChange={this.onchange('description')}
          />
          {/* Create New Spell Button */}
          <button type="button" onClick={this.createSpell}>
            Submit
          </button>
        </div>

        {/* Return to Spells List Button */}
        <button
          className="go-home"
          type="button"
          onClick={() => {
            this.props.changePage(SPELLS_LIST);
          }}
        >
          Return
        </button>
      </Wrapper>
    );
  }
}

export default CreateSpell;
