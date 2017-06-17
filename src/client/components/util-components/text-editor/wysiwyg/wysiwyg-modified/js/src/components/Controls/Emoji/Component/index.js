/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  onEmojiClick: Function = (event: Object): void => {
    const { onChange } = this.props;

    let object = event.target;
    onChange(<img src="xxxxx" />,18,18);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('rdw-emoji-modal', popupClassName)}
        onClick={stopPropagation}
      >
        {
          emojis.map((emoji, index) => (
          <img src={emoji.img}
            key={index}
            className="rdw-emoji-icon"
            alt={emoji.alt}
            onClick={::this.onEmojiClick}
          />))
        }
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="rdw-emoji-wrapper"
        aria-haspopup="true"
        aria-label="rdw-emoji-control"
        aria-expanded={expanded}
        title={title}
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;

// todo: unit test cases
