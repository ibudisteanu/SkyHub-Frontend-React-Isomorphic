/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/16/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {connect} from 'react-redux';

import SocketService from './../../../services/Communication/socket/Socket.service';

class SearchAutoComplete extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      backspaceRemoves : false,
      creatable : true,

      value: props.value||'',
    };
  }


  onChange (value) {
    this.setState({
      value: value,
    });

    let answer;
    if ((this.props.multi||false)===true){//multiple keywords

      if (!Array.isArray(value)) value = [value];

      answer = [];
      value.forEach (function(element){
        answer.push(element.value)
      });

    } else//just value
      answer = value.value;

    console.log("AUTOCOMPLETE:: ",answer);

    let onSelect = this.props.onSelect||function(){};
    onSelect(answer);
  }

  getSuggestions( input){

    if (!input)
      return Promise.resolve({ options: [] });

    return new Promise((resolve)=>{

      SocketService.sendRequestGetDataPromise("search/parents", {text: input}).then ((data)=>{

        if (data === null) { resolve (null); console.log("ERROR getting keywords "); }
        else {

          console.log("DATA",data);

          var optionsKeywords = [];
          data.forEach(function (entry){
            if (entry !== input)
              optionsKeywords.push({
                value: entry.id,
                label: entry.text,
              });
          });

          resolve ({options: optionsKeywords});

        }

      });

    });
  }

  render () {

    const AsyncSelectComponent = this.state.creatable
      ? Select.AsyncCreatable
      : Select.Async;

    return (
      <div className="section">

        {(this.props.label||'') !== '' ? (<h3 className="section-heading">{this.props.label}</h3>) : '' }

        <AsyncSelectComponent  multi={this.props.multi||false}  value={this.state.value} onChange={::this.onChange} valueKey="value" labelKey="label" loadOptions={::this.getSuggestions} backspaceRemoves={this.state.backspaceRemoves} placeholder={this.props.placeholder||"select"} clearable={(typeof this.props.clearable !== "undefined" ? this.props.clearable : true)} />

      </div>
    );
  }
}

function mapState (state){
  return {
    localization: state.localization,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(SearchAutoComplete);
