import React from 'react';
import classNames from 'classnames';

import LoginForm from "./login.form";


export default class LoginPage extends React.Component {

    back(e) {
        e.preventDefault(); e.stopPropagation();
        this.props.router.goBack();
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    loginForm = null;

    render() {
        return (
            <div id='auth-container' className='login' style={{marginTop: 75}}>

                <div className="col-sm-7 col-sm-offset-3 col-xs-10 col-xs-offset-1" >
                    <LoginForm ref={(c) => this.loginForm = c} onSuccess = {::this.back}  />
                </div>

            </div>
        );
    }
}
