/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on ${DATE}.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import * as SocketStatusActions from 'redux/website/actions/SocketStatus.actions.js';

import {
    Navbar,
    Icon,
   } from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        socketStatus : state.socketStatus,
    }),
    dispatch => ({dispatch}),
)
export class HeaderBarSocketStatus extends React.Component {

    sBackgroundColor = 'yellow';
    sTextColor = 'black';

    renderStatusBar () {
        if (this.props.socketStatus.connectionOffline) {
            this.sBackgroundColor = 'red';
            this.sTextColor = 'yellow';
        }
        else
        if (this.props.socketStatus.showOnlineStatus) {
            this.sBackgroundColor = 'yellow';
            this.sTextColor = 'navy';
        }

        return (
            <nav className='navbar navbar-default' style={{display: 'inline-block', width: '100%', marginBottom: -5, minHeight: 26, background: this.sBackgroundColor }} >

                <div style={{textAlign: 'center', margiTop: 5, color: this.sTextColor}}>
                    <Icon bundle='fontello' glyph={this.props.socketStatus.icon} />
                    <a href="#"><b style={{color: this.sTextColor}}>{ this.props.socketStatus.message }</b></a>
                </div>

            </nav>
        )
    }

    hideSocketStatusTimeout () {
        console.log('Hide Socket Status');
        setTimeout(this.hideSocketStatus.bind(this), 3000);
    }

    hideSocketStatus(){
        this.props.dispatch(SocketStatusActions.socketHideSocketStatusMessage());
    }

    render() {
        return (
            <div>
                { (this.props.socketStatus.connectionOffline) || (this.props.socketStatus.showOnlineStatus) ? ::this.renderStatusBar() : ''}
                {this.props.socketStatus.showOnlineStatus ? ::this.hideSocketStatusTimeout() : ''}
            </div>
        );
    }
}
