/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";


import ForumsService from './../../../../services/REST/forums/forums/Forums.service';
import AutocompleteSelect from './../../../../../client/components/util-components/select/Autocomplete.select.component';
import MyCountrySelect from './../../../../../client/components/util-components/select/MyCountry.select.component';

import Select from 'react-select';

class AddForumForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            title : '',
            description : '',
            keywords : [],
            countryCode : '', country : '',
            city : '',
            language : '',
            latitude : 0, longitude : 0,

            parentName : '',
            parentId : '',

            titleValidationStatus : [null, ''],
            descriptionValidationStatus : [null, ''],
            keywordsValidationStatus : [null, ''],
            countryValidationStatus : [null, ''],
            cityValidationStatus : [null, ''],
        }

    }

    convertValidationErrorToString(error) {
        if (error === "notUnique") return "Already exists in the Database"; else
        if (error === "notEmpty") return "It's empty";  else
        if (error === 'validateKeywords') return "Too few keywords. Minimum 3";

        return error;
    }

    handleAddForum(e){

        if (typeof e !== "undefined") {
            e.preventDefault();
            e.stopPropagation();
        }

        var onSuccess = this.props.onSuccess || function (){};
        var onError = this.props.onError || function (){};

        var titleValidationStatus = [null, ''], descriptionValidationStatus = [null, ''], keywordsValidationStatus = [null, ''], countryValidationStatus = [null, ''], cityValidationStatus = [null, ''];

        var bValidationError=false;
        this.setState({
            titleValidationStatus: titleValidationStatus,
            descriptionValidationStatus: descriptionValidationStatus,
            keywordsValidationStatus: keywordsValidationStatus,
            countryValidationStatus: countryValidationStatus,
            cityValidationStatus: cityValidationStatus,
        });

        console.log('ADDing forum... ');


        if (!bValidationError)
            ForumsService.forumAddAsync(this.state.parentId, this.state.title, this.state.description, this.state.keywords, this.state.countryCode, '', this.state.city, this.state.latitude, this.state.longitude, this.state.timeZone)

                .then((res) => {

                    console.log("ANSWER FROM adding forum",res);

                    if (res.result === true) {
                        onSuccess(res);
                    }
                    else if (res.result === false) {

                        if ((typeof res.errors.title !== "undefined") && (Object.keys(res.errors.title).length !== 0 )) titleValidationStatus = ["error", this.convertValidationErrorToString(res.errors.title[0])];
                        if ((typeof res.errors.description !== "undefined") && (Object.keys(res.errors.description).length !== 0)) descriptionValidationStatus = ["error", this.convertValidationErrorToString(res.errors.description[0])];
                        if ((typeof res.errors.keywords !== "undefined") && (Object.keys(res.errors.keywords).length !== 0)) keywordsValidationStatus = ["error", this.convertValidationErrorToString(res.errors.keywords[0])];
                        if ((typeof res.errors.country !== "undefined") && (Object.keys(res.errors.country).length !== 0)) countryValidationStatus = ["error", this.convertValidationErrorToString(res.errors.country[0])];
                        if ((typeof res.errors.city !== "undefined") && (Object.keys(res.errors.city).length !== 0)) cityValidationStatus = ["error", this.convertValidationErrorToString(res.errors.city[0])];

                        //in case there are no other errors, except the fact that I am not logged In
                        if ((typeof res.errors.authorId !== "undefined") && (Object.keys(res.errors.authorId).length !== 0))
                            if ((titleValidationStatus[0] === null)&&(descriptionValidationStatus[0] === null)&&(keywordsValidationStatus[0] === null)&&(countryValidationStatus[0] === null)&&(cityValidationStatus[0] === null))
                                this.openLogin();

                        this.setState({
                            titleValidationStatus: titleValidationStatus,
                            descriptionValidationStatus: descriptionValidationStatus,
                            keywordsValidationStatus: keywordsValidationStatus,
                            countryValidationStatus: countryValidationStatus,
                            cityValidationStatus: cityValidationStatus,
                        });

                        onError(res);
                    }

                });

    }

    componentDidMount() {

    }

    componentWillMount(){

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

        if (typeof this.props.routerState.refAuthenticationModal !== "undefined")
            this.props.routerState.refAuthenticationModal.openLogin();
    }

    authenticationSuccessfully(resource){
        this.handleAddForum();
    }

    render() {

        return (
            <PanelContainer controls={false} style={{marginBottom:20, marginTop:20}}>


                <Panel style={{backgroundColor:"#f9f8f8"}}>

                    <PanelHeader className='bg-green' style={{textAlign: "center"}}>
                        <Grid>
                            <Row>
                                <Col xs={12} className='fg-white'>
                                    <h3>Create a <strong>Forum</strong></h3>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelHeader>

                    <PanelBody style={{padding: 10, paddingLeft:40, paddingRight:40}}>

                        <div>


                            <Form onSubmit={::this.handleAddForum}>

                                <Row>
                                    <FormGroup controlId='titleInput' validationState={this.state.titleValidationStatus[0]}>
                                        <ControlLabel>Title</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-pen' />
                                            </InputGroup.Addon>

                                            <FormControl type='text' className='border-focus-blue' placeholder='title' value={this.state.title} onChange={::this.handleTitleChange} style={{zIndex:0}} />
                                            {/*<AutocompleteSelect multi={false} controlId="titeSelect" className='border-focus-blue'  placeholder='title'  value={this.state.title}  onSelect={::this.handleTitleChangeSelect} style={{zIndex:0}}  /> */}

                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.titleValidationStatus[1]}</HelpBlock>
                                    </FormGroup>

                                </Row>

                                <Row>
                                    <FormGroup controlId='descriptionInput' validationState={this.state.descriptionValidationStatus[0]}>
                                        <ControlLabel>Description</ControlLabel>
                                        <InputGroup >
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-edit' />
                                            </InputGroup.Addon>
                                            <FormControl type='text'  componentClass='textarea' rows='3' className='border-focus-blue' placeholder='description' value={this.state.description} onChange={::this.handleDescriptionChange} style={{zIndex:0}} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.descriptionValidationStatus[1]}</HelpBlock>
                                    </FormGroup>

                                </Row>

                                <Row>
                                    <FormGroup controlId='keywordsInput' validationState={this.state.keywordsValidationStatus[0]}>
                                        <ControlLabel>Keywords</ControlLabel>
                                        <InputGroup >
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-tag-empty' />
                                            </InputGroup.Addon>
                                            <AutocompleteSelect controlId="keywordsSelect" value={this.state.keywords} multi={true}   onSelect={::this.handleKeywordsSelect} style={{zIndex:0}} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.keywordsValidationStatus[1]}</HelpBlock>
                                    </FormGroup>

                                </Row>

                                <Row>
                                    <Col xs={6} collapseLeft collapseRight >
                                        <FormGroup controlId='country' validationState={this.state.countryValidationStatus[0]}>
                                            <ControlLabel>Country</ControlLabel>
                                            <InputGroup style={{marginRight: 10}}>
                                                <InputGroup.Addon>
                                                    <Icon glyph='icon-fontello-flag-1' />
                                                </InputGroup.Addon>

                                                <CountrySelect controlId="countrySelect" multi={false} flagImagePath="/../../imgs/app/flags/flags/flat/flagicons/"  value={this.state.countryCode}  onSelect={this.handleCountrySelect} style={{zIndex:0}} />
                                                <FormControl.Feedback />
                                            </InputGroup>
                                            <HelpBlock>{this.state.countryValidationStatus[1]}</HelpBlock>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight >
                                        <FormGroup controlId='city' validationState={this.state.cityValidationStatus[0]}>
                                            <ControlLabel>City</ControlLabel>
                                            <InputGroup >
                                                <InputGroup.Addon>
                                                    <Icon glyph='icon-fontello-home-1' />
                                                </InputGroup.Addon>
                                                <FormControl type='city' className='border-focus-blue' placeholder='city'  value={this.state.city} onChange={::this.handleCityChange} style={{zIndex:0}} />
                                                <FormControl.Feedback />
                                            </InputGroup>
                                            <HelpBlock>{this.state.cityValidationStatus[1]}</HelpBlock>
                                        </FormGroup>
                                    </Col>
                                </Row>


                            </Form>
                        </div>
                    </PanelBody>

                    <PanelFooter className='bg-lightgreen'>

                        <Grid>
                            <Row>
                                <Col className='text-right' style={{paddingTop:20, paddingBottom:20, paddingRight:20}}>
                                    <Button lg type='submit' bsStyle='primary' onClick={::this.handleAddForum}>Create Forum</Button>
                                </Col>
                            </Row>
                        </Grid>

                    </PanelFooter>

                </Panel>
            </PanelContainer>
        );
    }
}


function mapState (state){
  return {
    userAuthenticated: state.userAuthenticated,
    routerState: state.routerState,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(AddForumForm);
