import React from 'react';

import {
    Modal,
    Button,
} from '@sketchpixy/rubix';

import {LoginForm} from './../login/login.form';
import {RegistrationForm} from './../registration/registration.form';

export class AuthenticationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false, modalType : 'login', modalTitle : 'Login' };
    }

    close() {
        this.setState({ showModal: false});
    }

    open() {
        this.setState({ showModal: true });
    }

    setLogin(){
        this.setState( {
            modalType: "login",
            modalTitle: "Login to SkyHub",
        });
    }

    openLogin(){

        this.setLogin();
        this.open("login");
    }

    setRegistration(){
        this.setState( {
            modalType: "registration",
            modalTitle: "Register to SkyHub",
        });
    }

    openRegistration(){

        this.setRegistration();
        this.open("registration");
    }

    renderLogin(){
        return (
            <LoginForm ref={(c) => this.loginForm = c} onSuccess={::this.loginSuccess} onSwitch={::this.switchLoginToRegistration}/>
        )
    }

    renderRegistration(){
        return (
            <RegistrationForm ref={(c) => this.registrationForm = c} onSuccess={::this.registrationSuccess} onSwitch={::this.switchRegistrationToLogin}/>
        )
    }

    //bsSize="basic"
    render() {
        return (
            <Modal show={this.state.showModal} onHide={::this.close} >

                <Modal.Body>

                    {this.state.modalType == "login" ? ::this.renderLogin() : ::this.renderRegistration()}

                </Modal.Body>

            </Modal>
        );
    }


    loginSuccess(resource){
        var onSuccess = this.props.onSuccess||function(){};
        onSuccess(resource);
    }


    registrationSuccess(resource){
        var onSuccess = this.props.onSuccess||function(){};
        onSuccess(resource);
    }

    switchLoginToRegistration(e){
        e.preventDefault(); e.stopPropagation();
        this.setRegistration();
    }

    switchRegistrationToLogin(e){
        e.preventDefault(); e.stopPropagation();
        this.setLogin();
    }

}
