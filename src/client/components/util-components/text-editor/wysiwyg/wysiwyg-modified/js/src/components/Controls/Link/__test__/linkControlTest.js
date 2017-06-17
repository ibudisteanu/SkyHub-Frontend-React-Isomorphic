/* @flow */

import React from 'react';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

import LinkControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('LinkControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />
    ).html().startsWith('<div')).to.be.true;
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />
    );
    expect(control.children().length).to.equal(2);
  });

  it('should have no value for state variable link default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />
    );
    const linkControl = control.find('Link');
    assert.isNotTrue(linkControl.node.state.expanded);
    assert.equal(linkControl.node.state.link, undefined);
  });
});
