/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */
import React from 'react';
import HeaderCover from './HeaderCover.component';

export default class WebsiteHeaderCover extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {
        return (

                <HeaderCover title="SkyHub - Forum 2.0"
                             subTitle="Discover, Connect and Change the world together"
                             coverPic = "http://spitfiresocial.com/wp-content/uploads/2015/03/worldsocial.jpg">

                </HeaderCover>

        );
    }
}
