import React from 'react';
import classNames from 'classnames';
import history from '../../../src/history';

import LoginForm from "../../client/modules/users/authentication/login/Login.form";


export default class LoginPage extends React.Component {

    back(e) {
        e.preventDefault(); e.stopPropagation();
        history.goBack();
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

                  <div className="panel panel-success">

                    <div className="panel-heading">

                      <h2><strong>Login to </strong>SkyHub</h2>

                    </div>

                    <div className="panel-body">

                      <LoginForm ref={(c) => this.loginForm = c} onSuccess = {::this.back}  />

                    </div>

                  </div>


                </div>

            </div>
        );
    }
}
