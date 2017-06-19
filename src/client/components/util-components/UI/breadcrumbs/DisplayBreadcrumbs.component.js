/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/20/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

export default class DisplayBreadcrumbs extends React.Component {

  renderBreadcrumbs(){

    let breadcrumbs = [];
    if (typeof this.props.breadcrumbs !== "undefined")  breadcrumbs = this.props.breadcrumbs;

    if ((breadcrumbs === null)||(typeof breadcrumbs === "undefined")||(breadcrumbs === [])) return '';

    const breadcrumbsActiveIndex = breadcrumbs.length-1;
    return (
      breadcrumbs.map((object, index) =>
        <li className={index === breadcrumbsActiveIndex ? "active" : ''}>
          <a href={object.link}>{object.name}</a>
        </li>
      )
    );
  }

  render(){
    return (
      <ol className="breadcrumb">

        {::this.renderBreadcrumbs}

      </ol>
    )
  }

}
