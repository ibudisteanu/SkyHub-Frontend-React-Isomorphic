/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/10/2017.
 * (C) BIT TECHNOLOGIES
 */



import React from 'react';
import Link from '../../../../../Link/Link';

class NotAuthenticatedHeaderNavigationMenu extends React.Component {
  render() {
    return (


      <ul className="nav navbar-top-links navbar-right">

        <li>
          <Link to="/login">
            <i className="fa fa-home"></i>
            <span className="m-r-sm text-muted welcome-message">Home</span>
          </Link>
        </li>

        <li>
          <Link to="/login">
            <i className="fa fa-sign-in"></i>
            <span className="m-r-sm text-muted welcome-message">Log in</span>
          </Link>
        </li>

        <li>
          <Link to="/login">
            <i className="fa fa-user-plus"></i>
            <span className="m-r-sm text-muted welcome-message">Register</span>
          </Link>
        </li>

        <li>
          <Link to="/about">
            <span className="m-r-sm text-muted welcome-message">About</span>
          </Link>
        </li>

        <li>
          <Link to="/contact">
            <span className="m-r-sm text-muted welcome-message">Contact</span>
          </Link>
        </li>




      </ul>
    );
  }
}

export default NotAuthenticatedHeaderNavigationMenu;
