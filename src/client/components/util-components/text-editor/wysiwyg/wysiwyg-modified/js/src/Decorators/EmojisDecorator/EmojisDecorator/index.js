import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class EmojiDecorator {
  constructor(className) {
    this.className = className;
  }
  getEmojiDecoratorComponent = () => {
    const className = this.className;
    return class EmojiComponent extends Component {
      static PropTypes = {
        entityKey: PropTypes.number,
        children: PropTypes.object,
        contentState: PropTypes.object,
      }
      render() {
        const { entityKey, children, contentState } = this.props;
        let { text, img} = contentState.getEntity(entityKey).getData();
        if (typeof img === "undefined") img = 'https://assets-cdn.github.com/images/icons/emoji/'+text+".png";
        return (
          <img alt={text} src={img} style={{maxWidth:16, maxHeight:16}}/>

        );
      }
    };
  };
  getEmojiDecorator = () => {
    return {
      strategy: this.findEmojiesEntities,
      component: this.getEmojiDecoratorComponent(),
    }
  };
}

EmojiDecorator.prototype.findEmojiesEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'EMOJI_DECORATOR'
      );
    },
    callback,
  );
};

module.exports = EmojiDecorator;
