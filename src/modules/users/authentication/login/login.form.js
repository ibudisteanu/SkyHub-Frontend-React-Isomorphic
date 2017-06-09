import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';

import {OauthSocialNetworkComponent} from '../oauth-social-networks-form/oauth.social.networks.component';

import {
    Row,
    Col,
    Icon,
    Grid,
    Form,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    InputGroup,
    HelpBlock,
    FormControl,
    PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class LoginForm extends React.Component {


    constructor(props) {
        super(props);

        this.AuthService = new AuthService(props.dispatch);

         this.state = {

             userEmail : '',
             password : '',

             userEmailValidationStatus : [null, ''],
             passwordValidationStatus : [null, ''],
         }
    }

    back(e) {
        e.preventDefault(); e.stopPropagation();

        this.props.router.goBack();
    }



    handleCheckLogin(e){

        e.preventDefault(); e.stopPropagation();

        console.log(this.state.userEmail, this.state.password);

        this.AuthService.loginAsync(this.state.userEmail, this.state.password).then( (res) =>{

            var userEmailValidationStatus = [null, ''], passwordValidationStatus = [null,''];

            if (res.result === "true") {
                this.loginSuccessfully(res);
            }
            else
            if (res.result === "false"){
                if (res.message === "No User Found") {
                    userEmailValidationStatus = ["error","No User Found"];
                }
                if (res.message === "Password Incorrect") {
                    userEmailValidationStatus = ["success",''];
                    passwordValidationStatus = ["error","Incorrect Password"];
                }

                this.loginFailure(res);
            }

            this.setState({
                userEmailValidationStatus : userEmailValidationStatus,
                passwordValidationStatus : passwordValidationStatus,
            });

        });
    }

    handleUserEmailChange(e){
        this.setState({
            userEmail : e.target.value,
            userEmailValidationStatus  : [null, ''],
        });
    }

    handlePasswordChange(e){
        this.setState({
            password : e.target.value,
            passwordValidationStatus  : [null, '']
        });
    }

    loginSuccessfully(res){
        var onSuccess = this.props.onSuccess || function (){};

        onSuccess(res);
    }

    loginFailure(res){
        var onError = this.props.onError || function (){};

        onError(res);
    }


    render() {

        var onSwitch = this.props.onSwitch || function (){};

        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>

                <Panel>
                    <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 20}}> <strong>Login </strong>to SkyHub</h3>
                        </div>

                        <div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                <Form onSubmit={::this.handleCheckLogin}>
                                    <FormGroup controlId='emailaddress' validationState={this.state.userEmailValidationStatus[0]} >
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-mail' />
                                            </InputGroup.Addon>
                                            <FormControl autoFocus type='text' className='border-focus-blue' placeholder='username   or    email'  value={this.state.userEmail} onChange={::this.handleUserEmailChange} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.userEmailValidationStatus[1]}</HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId='password' validationState={this.state.passwordValidationStatus[0]}>
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-key' />
                                            </InputGroup.Addon>
                                            <FormControl type='password' className='border-focus-blue' placeholder='password' value={this.state.password} onChange={::this.handlePasswordChange}/>
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.userEmailValidationStatus[1]}</HelpBlock>
                                    </FormGroup>
                                    <FormGroup>
                                        <Grid>
                                            <Row>
                                                <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>

                                                    <div >
                                                        <Link to={getPath(this,'register')} onClick = {onSwitch.bind(this)}> <strong> Register </strong></Link>to SkyHub
                                                    </div>

                                                </Col>
                                                <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                    <Button lg type='submit' bsStyle='primary' onClick={::this.handleCheckLogin}>Login</Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </FormGroup>
                                </Form>
                            </div>

                            <OauthSocialNetworkComponent onSuccess={::this.loginSuccessfully} onError={::this.loginFailure} />

                        </div>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}
