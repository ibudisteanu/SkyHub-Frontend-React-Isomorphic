/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

import {connect} from "react-redux";

export default class HomeComponent extends React.Component {

    render() {
        return (
            <div>

                <section id="team" class="gray-section team">
                  <div class="container">

                    <div class="row m-b-lg">
                      <div class="col-lg-12 text-center">
                        <div class="navy-line"></div>
                        <h1><strong>SkyHub</strong></h1>
                        <p>SkyHub is a new Social Network that allows people to <strong>discover, talk and change </strong> the world together</p>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
                      </div>
                    </div>

                  </div>
                </section>





            </div>
        );
    }
}
