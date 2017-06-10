/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/10/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FLAGS = require('./flags/flags');
const FLAGS_SIZE = 18;

const FlagOption = createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  },
  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();

    //console.log(this);
    this.props.onSelect(this.props.option, event);
  },
  handleMouseEnter (event) {
    //console.log(this);
    this.props.onFocus(this.props.option, event);
  },
  handleMouseMove (event) {
    //console.log(this);
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  },
  render () {
    let flagStyle = {

      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className={this.props.className}
           onMouseDown={this.handleMouseDown}
           onMouseEnter={this.handleMouseEnter}
           onMouseMove={this.handleMouseMove}
           title={this.props.option.title}>
        <img src={this.props.option.flag} size={FLAGS_SIZE} className={this.props.option.imageCSS}  style={flagStyle} />
        {this.props.children}
      </div>
    );
  }
});

const FlagValue = createClass({
  propTypes: {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object,
  },
  render () {

    var flagStyle = {

      display: 'inline-block',

      position: 'relative',
      top: 10,
      verticalAlign: 'middle',
    };

    return (
      <div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<img src={this.props.value.flag} size={FLAGS_SIZE} className={this.props.value.imageCSS} style={flagStyle} />
          {this.props.children}
				</span>
      </div>
    );
  }
});

const MyCountrySelect = createClass({


  propTypes: {
    hint: PropTypes.string,
    label: PropTypes.string,
    initialCountry: PropTypes.string,
    onSelect: PropTypes.func,
  },
  getInitialState () {

    return {value: this.props.initialCountry||"ro"};
  },
  setValue (value) {
    this.setState({ value });

    if (this.props.onSelect !== null)
      this.props.onSelect(value);
  },
  render () {
    var placeholder = <span>&#9786; Select User</span>;

    return (
      <Select
        arrowRenderer={arrowRenderer}
        onChange={this.setValue}
        optionComponent={FlagOption}
        options={FLAGS}
        clearable ={false}
        placeholder={placeholder}
        value={this.state.value}
        valueComponent={FlagValue}
      />
    );
  },
});

function arrowRenderer () {
  return (
    <span>+</span>
  );
}

export default MyCountrySelect;
