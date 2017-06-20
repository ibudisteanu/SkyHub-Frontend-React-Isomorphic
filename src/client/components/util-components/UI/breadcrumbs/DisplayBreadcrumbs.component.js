/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/20/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

export default class DisplayBreadcrumbs extends React.Component {

  renderBreadcrumbs(){

    let breadcrumbs = [];
    if (typeof this.props.breadcrumbs !== "undefined")  breadcrumbs = this.props.breadcrumbs;

    console.log("LENGTH BREADCRUMBS %%%%%%%%%%% ",breadcrumbs);

    if ((breadcrumbs === null)||(typeof breadcrumbs === "undefined")||(breadcrumbs === [])) return '';

    return (
      breadcrumbs.map((object, index) =>
        <li key={"breadcrumb"+index} >
          <a href={object.url}>{object.name}</a>
        </li>
      )
    );
  }

  render(){
    return (
      <ol className="breadcrumb" >

        <li key="breadcrumb_home">
          <a href={"/"}>Home</a>
        </li>

        {::this.renderBreadcrumbs()}

        <li className="active" key="breadcrumb_current_page">
          <a href={this.props.currentPageUrl}>{this.props.currentPageTitle}</a>
        </li>


      </ol>
    )
  }

}
