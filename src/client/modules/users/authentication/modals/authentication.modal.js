import React from 'react';

import LoginForm from './../login/login.form';
import RegistrationForm from './../registration/registration.form';

import ModalComponent from '../../../../../client/components/util-components/modals/Modal.component';

class AuthenticationModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  modalType : 'login', modalTitle : 'Login' };
    }

    close() {
      this.modalRef.closeModal();
    }

    open() {
      this.modalRef.showAlert();
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

    modalRef = null;

    loginRef = null;
    registrationRef = null;

    renderLogin(){
        return (
            <LoginForm ref={(c) => this.loginRef = c} onSuccess={::this.loginSuccess} onSwitch={::this.switchLoginToRegistration} />
        )
    }

    renderRegistration(){
        return (
            <RegistrationForm ref={(c) => this.registrationRef = c} onSuccess={::this.registrationSuccess} onSwitch={::this.switchRegistrationToLogin} />
        )
    }

    render() {

        return (

            <ModalComponent modalId="AuthenticationModal"  ref={(c) => this.modalRef = c} title={this.state.modalTitle} subTitle="" buttons={[]} >

              {this.state.modalType === "login" ? ::this.renderLogin() : ::this.renderRegistration()}

            </ModalComponent>

        );
    }


    loginSuccess(resource){
        let onSuccess = this.props.onSuccess||function(){};
        onSuccess(resource);

        close();
    }


    registrationSuccess(resource){
        let onSuccess = this.props.onSuccess||function(){};
        onSuccess(resource);

        close();
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

export default AuthenticationModal;
