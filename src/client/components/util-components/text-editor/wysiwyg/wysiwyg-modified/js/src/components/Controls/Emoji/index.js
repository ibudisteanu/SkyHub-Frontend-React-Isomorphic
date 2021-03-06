/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState , AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

export default class Emoji extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  addEmoji: Function = (src, height, width): void => {

    console.log(src, height, width);

    const { editorState, onChange } = this.props;

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${src}`,
      editorState.getCurrentInlineStyle(),
    );

    onChange(EditorState.push(editorState, contentState, 'insert-characters'));

    // const entityKey = editorState
    //   .getCurrentContent()
    //   .createEntity('EMOJI_DECORATOR', 'MUTABLE', { src, height, width })
    //   .getLastCreatedEntityKey();
    // const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    //   editorState,
    //   entityKey,
    //   ' ',
    // );
    // onChange(newEditorState);

    this.doCollapse();
  };




  render(): Object {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const EmojiComponent = config.component || LayoutComponent;


    return (
      <EmojiComponent
        config={config}
        translations={translations}
        onChange={this.addEmoji}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onCollpase={this.closeModal}
      />
    );
  }
}

// todo: unit test cases
