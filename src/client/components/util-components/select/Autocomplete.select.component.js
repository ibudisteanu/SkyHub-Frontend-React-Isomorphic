/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/25/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import jsonp  from 'jsonp';

export default class AutocompleteSelect extends React.Component {

    displayName: 'GithubUsers';

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
            answer = value;

        console.log("AUTOCOMPLETE:: ",answer);

        let onSelect = this.props.onSelect||function(){};
        onSelect(answer);
    }


    getSuggestionsGitHub (input) {
        if (!input)
            return Promise.resolve({ options: [] });

        return fetch(`https://api.github.com/search/users?q=${input}`)
            .then((response) => response.json())
            .then((json) => {
                return { options: json.items };
            });
    }

    //using Google http://google.com/complete/search?client=firefox&hl=ro&q=theory
    async getSuggestions( input){

        if (!input)
            return { options: [] };

        data = await jsonp(`http://google.com/complete/search?client=firefox&hl=ro&q=${input}`);

        let keywords = data[1];
        let optionsKeywords = [];
        keywords.forEach(function (entry){
            optionsKeywords.push({
                value: entry,
                label: entry,
            });
        });

        //console.log({options: optionsKeywords});

        return {options: optionsKeywords};
    }

    render () {

        const AsyncSelectComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;

        return (
            <div className="section">

                {(this.props.label||'') !== '' ? (<h3 className="section-heading">{this.props.label}</h3>) : '' }

                <AsyncSelectComponent multi={this.props.multi||false} value={this.state.value} onChange={::this.onChange} valueKey="value" labelKey="label" loadOptions={::this.getSuggestions} backspaceRemoves={this.state.backspaceRemoves} />

            </div>
        );
    }
}
