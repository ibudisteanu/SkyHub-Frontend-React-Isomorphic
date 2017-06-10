/**
 * Created by Alexandru Ionut Budisteanu - SkyHub
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';

import {RegistrationForm} from "./registration.form";

import {
    Row,
    Col,
    Grid,
} from '@sketchpixy/rubix';

@withRouter
export default class Signup extends React.Component {

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
            <div id='auth-container' className='login'  style={{marginTop: 75}}>
                <div id='auth-row'>
                    <div id='auth-cell'>
                        <Grid>
                            <Row>
                                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                    <RegistrationForm ref={(c) => this.registrationForm = c}  onSuccess = {::this.back} />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}
