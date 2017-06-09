import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';

import {LoginForm} from "./login.form";

import {
    Row,
    Col,
    Grid,
} from '@sketchpixy/rubix';

@withRouter
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

    render() {
        return (
            <div id='auth-container' className='login' style={{marginTop: 75}}>
                <div id='auth-row'>
                    <div id='auth-cell'>
                        <Grid>
                            <Row>
                                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                    <LoginForm ref={(c) => this.loginForm = c} onSuccess = {::this.back}  />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}
