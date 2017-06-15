/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";


import ForumsService from './../../../../services/REST/forums/forums/Forums.service';
import ContentService from './../../../../services/REST/forums/content/Content.service';

import AutocompleteSelect from './../../../../../client/components/util-components/select/Autocomplete.select.component';
import MyCountrySelect from './../../../../../client/components/util-components/select/MyCountry.select.component';

import history from './../../../../../history.js';

import Select from 'react-select';

class AddForumForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            name:'', urlSlug:'',
            title : '',
            description : '',
            keywords : [],

            countryCode : '', country : '',
            city : '',
            language : '',
            latitude : 0, longitude : 0,

            nameValidationStatus: [null,''],
            titleValidationStatus : [null, ''],
            descriptionValidationStatus : [null, ''],
            keywordsValidationStatus : [null, ''],
            countryValidationStatus : [null, ''],
            cityValidationStatus : [null, ''],
        }

    }

    handleAddForum(e){

        if (typeof e !== "undefined") {
            e.preventDefault();
            e.stopPropagation();
        }

        let onSuccess = this.props.onSuccess || function (){};
        let onError = this.props.onError || function (){};

        let nameValidationStatus = [null,''], titleValidationStatus = [null, ''], descriptionValidationStatus = [null, ''], keywordsValidationStatus = [null, ''], countryValidationStatus = [null, ''], cityValidationStatus = [null, ''];

        let bValidationError=false;
        this.setState({
            nameValidationStatus: nameValidationStatus,
            titleValidationStatus: titleValidationStatus,
            descriptionValidationStatus: descriptionValidationStatus,
            keywordsValidationStatus: keywordsValidationStatus,
            countryValidationStatus: countryValidationStatus,
            cityValidationStatus: cityValidationStatus,
        });

        console.log('ADDing forum... ');

        if (!bValidationError)
            ForumsService.forumAddAsync(this.props.parentId||'', this.state.name, this.state.title, this.state.description, this.state.keywords,
                                        this.state.countryCode||this.props.localization.countryCode, '',
                                        this.state.city||this.props.localization.city, this.state.latitude, this.state.longitude, this.state.timeZone)

                .then((answer) => {

                    console.log("ANSWER FROM adding forum",answer);

                    if (answer.result === true) {
                        onSuccess(answer);

                        history.push(answer.forum.URL);// redirecting to the forum URL ;)
                    }
                    else if (answer.result === false) {

                        if ((typeof answer.errors.name !== "undefined") && (Object.keys(answer.errors.name).length !== 0 )) nameValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.name[0])];
                        if ((typeof answer.errors.title !== "undefined") && (Object.keys(answer.errors.title).length !== 0 )) titleValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.title[0])];
                        if ((typeof answer.errors.description !== "undefined") && (Object.keys(answer.errors.description).length !== 0)) descriptionValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.description[0])];
                        if ((typeof answer.errors.keywords !== "undefined") && (Object.keys(answer.errors.keywords).length !== 0)) keywordsValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.keywords[0])];
                        if ((typeof answer.errors.country !== "undefined") && (Object.keys(answer.errors.country).length !== 0)) countryValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.country[0])];
                        if ((typeof answer.errors.city !== "undefined") && (Object.keys(answer.errors.city).length !== 0)) cityValidationStatus = ["error", this.convertValidationErrorToString(answer.errors.city[0])];

                        //in case there are no other errors, except the fact that I am not logged In
                        if ((typeof answer.errors.authorId !== "undefined") && (Object.keys(answer.errors.authorId).length !== 0))
                            if ((titleValidationStatus[0] === null)&&(descriptionValidationStatus[0] === null)&&(keywordsValidationStatus[0] === null)&&(countryValidationStatus[0] === null)&&(cityValidationStatus[0] === null))
                                this.openLogin();

                        this.setState({
                            nameValidationStatus: nameValidationStatus,
                            titleValidationStatus: titleValidationStatus,
                            descriptionValidationStatus: descriptionValidationStatus,
                            keywordsValidationStatus: keywordsValidationStatus,
                            countryValidationStatus: countryValidationStatus,
                            cityValidationStatus: cityValidationStatus,
                        });

                        onError(answer);
                    }

                });

    }

    handleNameChangeSelect(value){

      this.setState({
        name : value,
        nameValidationStatus  : [null, '']
      });

      value = (((value !== null)&&(value.hasOwnProperty("value"))) ? value.value : value);

      console.log("name",value);
      this.setState({ nameValidationStatus: [null, ''] });

      ContentService.getURLSlug(value) .then( (answer)=>{

          if (!answer.result)
            this.setState({ nameValidationStatus: ["error", answer.message] });
          else {
            this.setState({urlSlug: answer.URLSlug})
          }

      });

    }

    handleNameChange(e){
      this.handleNameChangeSelect(e.target.value);
    }

    handleTitleChangeSelect(value){
        this.setState({
            title : value,
            titleValidationStatus  : [null, '']
        });
    }

    handleTitleChange(e){
        this.handleTitleChangeSelect(e.target.value);
    }

    handleDescriptionChange(e){
        this.setState({
            description : e.target.value,
            descriptionValidationStatus  : [null, '']
        });
    }

    handleKeywordsSelect(value){
        this.setState({
            keywords : value,
            keywordsValidationStatus  : [null, '']
        });

        console.log("KEYWORDS SELECTED: " , value );
    }

    handleCountrySelect(val){
        this.setState({
            country : val.label,
            countryCode : val.value,

            countryValidationStatus  : [null, '']
        });

        console.log("values selected are:", val);
    }

    handleCityChange(e){
        this.setState({
            city : e.target.value,
            cityValidationStatus  : null, cityValidationStatusText : ''
        });
    }

    openLogin(){

        if (typeof this.props.routerState.refAuthenticationModal !== "undefined") {
          this.props.routerState.refAuthenticationModal.setOnSuccessEvent(::this.authenticationSuccessfully);
          this.props.routerState.refAuthenticationModal.openLogin();
        }
    }

    authenticationSuccessfully(resource){
        this.handleAddForum();
    }

    convertValidationErrorToString(error) {
      if (error === "notUnique") return "Already exists in the Database"; else
      if (error === "notEmpty") return "It's empty"; else
      if (error === "validateUsername") return " Invalid username"; else
      if (error === "validateKeywords") return " Too few keywords. Minimum 3";

      return error;
    }
    //https://www.w3schools.com/bootstrap/bootstrap_forms_inputs2.asp DOC
    showInputStatus(status){
      return status[0] === 'error' ? "has-error has-feedback" : (status[0] === 'success' ? "has-success has-feedback" : '');
    }
    showInputFeedback(status){
      return status[0] === 'error' ? "fa fa-remove form-control-feedback" : (status[0] === 'success' ?  "fa fa-check form-control-feedback" : '');
    }

    render() {

        return (

            <div className="col-sm-8 col-sm-offset-2" style={{padding:0}} >

              <div className="panel panel-warning">

                <div className="panel-heading">
                  <h2>Create a new <strong>Forum</strong> in {this.props.parentName||'Home'} </h2>
                </div>

                <div className="panel-body">

                  <form onSubmit={::this.handleAddForum} autoComplete="on">


                    <div style={{paddingBottom: 20}}>
                      <p >Forum Name (one- two words):</p>
                      <div className={"input-group " + this.showInputStatus(this.state.nameValidationStatus)}  >

                        <span className="input-group-addon"><i className="fa fa-plus"></i></span>

                        <AutocompleteSelect multi={false} controlId="nameSelect" className='border-focus-blue'  placeholder='forum name (one or two words)'  value={this.state.name}  onSelect={::this.handleNameChangeSelect} style={{zIndex:0}}  clearable={false} />

                        <span className={::this.showInputFeedback(this.state.nameValidationStatus)} style={{width:60, top:10}}></span>
                      </div>
                      <label className="error" >{this.state.nameValidationStatus[1]}</label> <br />
                      Forum URL: skyhub.me/<label className="success" >{this.state.urlSlug}</label> <br />
                    </div>


                    <div className={"input-group " + this.showInputStatus(this.state.titleValidationStatus)}  >

                      <span className="input-group-addon"><i className="fa fa-font"></i></span>

                      <input autoFocus type='text' className='form-control input-lg' placeholder='title'  name="title" value={this.state.title} onChange={::this.handleTitleChange} />
                      {/*<AutocompleteSelect multi={false} controlId="titleSelect" className='border-focus-blue'  placeholder='title'  value={this.state.title}  onSelect={::this.handleTitleChangeSelect} style={{zIndex:0}}  /> */}

                      <span className={::this.showInputFeedback(this.state.titleValidationStatus)}></span>
                    </div>
                    <label className="error" >{this.state.titleValidationStatus[1]}</label> <br />




                    <div className={"input-group " + this.showInputStatus(this.state.descriptionValidationStatus)}  >

                      <span className="input-group-addon"><i className="fa fa-edit"></i></span>

                      <textarea type='text' className='form-control input-lg' rows="5" placeholder='description'  name="description" value={this.state.description} onChange={::this.handleDescriptionChange} />

                      <span className={::this.showInputFeedback(this.state.descriptionValidationStatus)}></span>
                    </div>
                    <label className="error" >{this.state.descriptionValidationStatus[1]}</label> <br />



                    <div className={"input-group " + this.showInputStatus(this.state.keywordsValidationStatus)}  >

                      <span className="input-group-addon"><i className="fa fa-tags"></i></span>

                      <AutocompleteSelect controlId="keywordsSelect" value={this.state.keywords} multi={true}   onSelect={::this.handleKeywordsSelect} style={{zIndex:0}} placeholder="three keywords"/>

                    </div>
                    <label className="error" >{this.state.keywordsValidationStatus[1]}</label> <br />


                    <div className="row" >

                        <div className="col-sm-6">
                          <div className={"input-group " + this.showInputStatus(this.state.countryValidationStatus)}  >

                            <span className="input-group-addon"><i className="fa fa-flag"></i></span>

                            <MyCountrySelect initialCountry={this.props.localization.countryCode||''} onSelect={::this.handleCountrySelect}/>

                            <span className={::this.showInputFeedback(this.state.countryValidationStatus)}></span>
                          </div>
                          <label className="error" >{this.state.countryValidationStatus[1]}</label> <br />
                        </div>

                        <div className="col-sm-6" style={{paddingBottom: 5}}>
                          <div className={"input-group " + this.showInputStatus(this.state.cityValidationStatus)}  >

                            <span className="input-group-addon"><i className="fa fa-institution"></i></span>

                            <input type='text' className='form-control input-lg' placeholder='city'  value={this.props.localization.city||this.state.city} onChange={::this.handleCityChange} />

                            <span className={::this.showInputFeedback(this.state.cityValidationStatus)}></span>
                          </div>
                          <label className="error" >{this.state.cityValidationStatus[1]}</label> <br />
                        </div>

                    </div>



                  </form>

                </div>

                <div className="panel-footer text-right" style={{paddingTop:20, paddingBottom:20, paddingRight:20}}>

                    <button className="btn btn-primary" type='button' onClick={::this.handleAddForum}> <i className="fa fa-plus" /> Create Forum</button>

                </div>

              </div>

            </div>


        );
    }
}


function mapState (state){
  return {
    userAuthenticated: state.userAuthenticated,
    routerState: state.routerState,
    localization: state.localization,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(AddForumForm);
