/**
 * Created by Alexandru Ionut Budisteanu - SkyHub
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import Link from '../../../../components/Link/Link';

import Select from 'react-select';

//import CountrySelect from "react-country-select";

//import {OauthSocialNetworkComponent} from '../oauth-social-networks-form/oauth.social.networks.component';

export default class RegistrationForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            userName : '',
            emailAddress : '',
            password : '',
            retypePassword : '',
            city : '',
            country : '',
            countryCode : '',
            timeZone : '',
            ip: '',

            latitude : 0, longitude : 0,

            userNameValidationStatus : [null, ''],
            emailAddressValidationStatus : [null, ''],
            firstNameValidationStatus : [null, ''],
            lastNameValidationStatus : [null, ''],
            passwordValidationStatus : [null,  ''],
            retypePasswordValidationStatus : [null,  ''],
            countryValidationStatus : [null,   ''],
            cityValidationStatus : [null,  ''],
        }

    }

  componentDidMount() {
    requestAnimationFrame(() => { //Make sure it is on client only

      this.SocketService = require('./../../../../services/Communication/socket/socket.service').default.SocketService;
      this.AuthService = require('./../../../../services/REST/authentication/auth.service').default.AuthService;

    });
  }

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
    }

    handleCheckRegister(e){

        e.preventDefault(); e.stopPropagation();

        console.log(this.state.userName, this.state.emailAddress, this.state.firstName, this.state.lastName, this.state.password, this.state.retypePassword, this.state.latitude, this.state.longitude, this.state.city, this.state.country, this.state.ip);

        var userNameValidationStatus = [null, ''],  emailAddressValidationStatus = [null, ''],  firstNameValidationStatus = [null, ''], lastNameValidationStatus = [null, ''], passwordValidationStatus = [null,  ''],
            retypePasswordValidationStatus = [null,  ''], countryValidationStatus = [null,  ''],  cityValidationStatus = [null,  ''];

        var bValidationError = false;

        if (this.state.password.length < 4){
            passwordValidationStatus = ["error","To weak. At least 4 characters"];
            bValidationError = true;
        }

        if ((this.state.password !== this.state.retypePassword)&&(this.state.password !== '')){
            retypePasswordValidationStatus = ["error","The passwords don't match"];
            bValidationError = true;
        }

        this.setState({
            userNameValidationStatus : userNameValidationStatus, emailAddressValidationStatus : emailAddressValidationStatus,
            firstNameValidationStatus : firstNameValidationStatus, lastNameValidationStatus : lastNameValidationStatus,
            passwordValidationStatus : passwordValidationStatus, retypePasswordValidationStatus : retypePasswordValidationStatus,
            countryValidationStatus : countryValidationStatus, cityValidationStatus : cityValidationStatus,
        });


        if (!bValidationError)
        this.AuthService.registerAsync(this.state.userName, this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName, this.state.countryCode, '', this.state.city, this.state.latitude, this.state.longitude, this.state.timeZone)

            .then( (res) =>{

            console.log(res);

            if (res.result === "true") {
                this.registrationSuccessfully(res);
            }
            else
            if (res.result === "false"){

                if ((typeof res.errors.username !=="undefined")&&(Object.keys(res.errors.username).length !== 0 )) this.setState({userNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.username[0])]});
                if ((typeof res.errors.email !=="undefined")&&(Object.keys(res.errors.email).length !== 0)) this.setState({emailAddressValidationStatus : ["error", this.convertValidationErrorToString(res.errors.email[0])]});
                if ((typeof res.errors.firstName !=="undefined")&&(Object.keys(res.errors.firstName).length !== 0)) this.setState({firstNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.firstName[0])]});
                if ((typeof res.errors.lastName !=="undefined")&&(Object.keys(res.errors.lastName).length  !== 0)) this.setState({lastNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.lastName[0])]});
                if ((typeof res.errors.country !=="undefined")&&(Object.keys(res.errors.country).length  !== 0)) this.setState({countryValidationStatus : ["error", this.convertValidationErrorToString(res.errors.country[0])]});
                if ((typeof res.errors.city !=="undefined")&&(Object.keys(res.errors.city).length  !== 0)) this.setState({cityValidationStatus : ["error", this.convertValidationErrorToString(res.errors.city[0])]});

                this.registrationFailure(res);
            }

        });

    }

    componentDidMount() {

 /*       axios.get("http://freegeoip.net/json/") .then(res => {

                res = res.data;

                this.setState({
                    country: res.country_name||'',
                    countryCode : res.country_code||'',
                    city : res.city||'',
                    latitude : res.latitude||'',
                    longitude : res.longitude||'',
                    ip : res.ip||'',
                    timeZone: res.time_zone||'',
                });

                console.log(res);
            });*/
    }

    handleUserNameChange(e){
        this.setState({
            userName : e.target.value,
            userNameValidationStatus  : [null, '']
        });
    }

    handleEmailAddressChange(e){
        this.setState({
            emailAddress : e.target.value,
            emailAddressValidationStatus  : [null, '']
        });
    }

    handleFirstNameChange(e){
        this.setState({
            firstName : e.target.value,
            firstNameValidationStatus  : [null, '']
        });
    }

    handleLastNameChange(e){
        this.setState({
            lastName : e.target.value,
            lastNameValidationStatus  : [null, '']
        });
    }

    handlePasswordChange(e){
        this.setState({
            password : e.target.value,
            passwordValidationStatus  : [null, '']
        });
    }

    handleRetypePasswordChange(e){
        this.setState({
            retypePassword : e.target.value,
            retypePasswordValidationStatus  : [null, '']
        });
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

    registrationSuccessfully(res){
        var onSuccess = this.props.onSuccess || function (){};

        onSuccess(res);

    }

    registrationFailure(res){
        var onError = this.props.onError || function (){};

        onError(res);
    }

    convertValidationErrorToString(error) {
      if (error === "notUnique") return "Already exists in the Database"; else
      if (error === "notEmpty") return "It's empty"; else
      if (error === "validateUsername") return " Invalid username";

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

        var onSuccess = this.props.onSuccess || function (){};
        var onSwitch = this.props.onSwitch || function (){};

        return (
            <div className="panel panel-warning">

                  <div className="panel-heading">

                    <h2><strong>Register </strong>SkyHub</h2>

                  </div>


                  <div className="panel-body">

                      <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>

                          <form onSubmit={::this.handleCheckRegister}>

                              <div className="row" style={{paddingBottom: 20}}>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.userNameValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='username'  value={this.state.userName} onChange={::this.handleUserNameChange} />

                                    <span className={::this.showInputFeedback(this.state.userNameValidationStatus)}></span>
                                  </div>
                                </div>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.emailAddressValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='E-mail'  value={this.state.emailAddress} onChange={::this.handleEmailAddressChange} />

                                    <span className={::this.showInputFeedback(this.state.emailAddressValidationStatus)}></span>
                                  </div>
                                </div>

                              </div>

                              <div className="row" style={{paddingBottom: 20}}>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.firstNameValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-font"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='First Name'  value={this.state.firstName} onChange={::this.handleFirstNameChange} />

                                    <span className={::this.showInputFeedback(this.state.firstNameValidationStatus)}></span>
                                  </div>
                                </div>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.lastNameValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-bold"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='Last Name'  value={this.state.lastName} onChange={::this.handleLastNameChange} />

                                    <span className={::this.showInputFeedback(this.state.lastNameValidationStatus)}></span>
                                  </div>
                                </div>

                              </div>

                              <div className="row" style={{paddingBottom: 20}}>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.passwordValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-key"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='password'  value={this.state.password} onChange={::this.handlePasswordChange} />

                                    <span className={::this.showInputFeedback(this.state.passwordValidationStatus)}></span>
                                  </div>
                                </div>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.retypePasswordValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-key"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='password'  value={this.state.retypePassword} onChange={::this.handleRetypePasswordChange} />

                                    <span className={::this.showInputFeedback(this.state.retypePasswordValidationStatus)}></span>
                                  </div>
                                </div>

                              </div>

                              <div className="row" style={{paddingBottom: 20}}>

                                <div className="col-xs-6">
                                  <div className={"input-group " + this.showInputStatus(this.state.countryValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-flag"></i></span>


                                    <span className={::this.showInputFeedback(this.state.countryValidationStatus)}></span>
                                  </div>
                                </div>

                                <div className="col-xs-6" style={{paddingBottom: 20}}>
                                  <div className={"input-group " + this.showInputStatus(this.state.cityValidationStatus)}  >

                                    <span className="input-group-addon"><i className="fa fa-institution"></i></span>

                                    <input autoFocus type='text' className='form-control input-lg' placeholder='city'  value={this.state.retypePassword} onChange={::this.handleCityChange} />

                                    <span className={::this.showInputFeedback(this.state.cityValidationStatus)}></span>
                                  </div>
                                </div>

                              </div>


                              <div className="form-group" >
                                <div className="row">
                                  <div className="col-xs-6" style={{paddingTop: 10}}>

                                    <div >
                                      <Link to={'login'} onClick = {onSwitch.bind(this)}> <strong> Login </strong></Link>to SkyHub
                                    </div>

                                  </div>
                                  <div className="col-xs-6 text-right" >
                                    <button  type='button' className='btn btn-info' onClick={::this.handleCheckRegister}><i className="fa fa-sign-up"></i> Register</button>
                                  </div>
                                </div>
                              </div>


                          </form>
                      </div>

                  </div>

            </div>
        );
    }
}
