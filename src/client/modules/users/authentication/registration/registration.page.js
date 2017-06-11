/**
 * Created by Alexandru Ionut Budisteanu - SkyHub
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

import RegistrationForm from "./registration.form";

export default class RegistrationPage extends React.Component {

    back(e) {
        e.preventDefault(); e.stopPropagation();
       // this.props.router.goBack();
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    render() {
        return (
          <div id='auth-container' className='login' style={{marginTop: 75}}>

              <div className="col-sm-7 col-sm-offset-3 col-xs-10 col-xs-offset-1" >

                <div className="panel panel-warning">

                  <div className="panel-heading">
                    <h2><strong>Register </strong>SkyHub</h2>
                  </div>


                  <div className="panel-body">
                    <RegistrationForm ref={(c) => this.loginForm = c} onSuccess = {::this.back}  />
                  </div>

                </div>

              </div>

          </div>
        );
    }
}
