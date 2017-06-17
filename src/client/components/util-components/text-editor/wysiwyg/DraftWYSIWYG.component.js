/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/17/2017.
 * (C) BIT TECHNOLOGIES
 */

/*
    Source code: https://github.com/jpuri/react-draft-wysiwyg
    TUTORIAL BASED ON https://jpuri.github.io/react-draft-wysiwyg/#/demo
 */

import React from 'react';

import draftToHtml from 'draftjs-to-html';
import { convertToRaw, convertFromHTML,  ContentState,  EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
//import { Editor } from 'react-draft-wysiwyg';
import { Editor } from './wysiwyg-modified/js/src/index.js';
import uploadImageCallBack from './additionals/uploadImageCallback';

import ColorPic from './additionals/ColorPic';

let bold = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/bold.gif';
let italic = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/italic.gif';
let underline = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/underline.gif';
let strikethrough = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/strikethrough.gif';
let subscript = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/subscript.gif';
let superscript = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/superscript.gif';
let eraser = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/erase.gif';
let left = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/left-align.gif';
let right = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/right-align.gif';
let center = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/center-align.gif';
let justify = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/justify.gif';
let ordered = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/ordered.gif';
let unordered = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/unordered.gif';
let indent = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/indent.gif';
let outdent = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/outdent.gif';
let link = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/link.gif';
let unlink = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/unlink.gif';
let image = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/image.gif';
let undo = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/undo.gif';
let redo = 'https://github.com/jpuri/react-draft-wysiwyg/tree/master/docs/images/demo/redo.gif';

export default class DraftWYSIWYG extends React.Component {

  state: any = {
    editorContents: [],
  };

  onEditorStateChange: Function = (index, editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState({
      editorContents,
    });
  };

  componentDidMount(){

    requestAnimationFrame(() => { //Make sure it is on client only

      const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
        'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
        'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
        'commodo quis dolor in, sagittis scelerisque nibh. ' +
        'Suspendisse consequat, sapien sit amet pulvinar  ' +
        'tristique, augue ante dapibus nulla, eget gravida ' +
        'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
        'accumsan. Vivamus porta cursus libero vitae mattis. ' +
        'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
        'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

      const contentState = ContentState.createFromBlockArray(contentBlocks);

// const initialContentState = convertToRaw(contentState);

        this.setState( {sampleEditorContent: EditorState.createWithContent(contentState) });

    });

  }

  render() {
    const { editorContents } = this.state;
    return (
      <div className="demo-root">


        <div className="demo-label">
          Editor with output generated in Markdown.
        </div>
        <div className="demo-editorSection">
          <div className="row">
            <Editor
              hashtag={{}}
              editorState={editorContents[2]}
              toolbarClassName="demo-toolbar"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange.bind(this, 2)}
              toolbar={{
                image: { uploadCallback: uploadImageCallBack },
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: false },
                link: { inDropdown: true },
                emoji: {   //see documentation https://github.com/jpuri/react-draft-wysiwyg/blob/master/js/src/config/defaultToolbar.js
                  icon: "http://www.matchdoctor.com/image/forums/emoticons/20.gif",
                  className: "",
                  emojis: [
                    {code:":)", alt:"Smile", img:"https://assets-cdn.github.com/images/icons/emoji/unicode/1f604.png"},
                    {code:":D", alt:"Smile", img:"https://assets-cdn.github.com/images/icons/emoji/unicode/1f603.png"},
                  ],
                  title: 'Emoji',
                },
              }}
              mention={{
                separator: ' ',
                trigger: '@',
                suggestions: [
                  { text: 'APPLE', value: 'apple', url: 'apple' },
                  { text: 'BANANA', value: 'banana', url: 'banana' },
                  { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                  { text: 'DURIAN', value: 'durian', url: 'durian' },
                  { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                  { text: 'FIG', value: 'fig', url: 'fig' },
                  { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                  { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                ],
              }}

            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={editorContents[2] && draftToMarkdown(convertToRaw(editorContents[2].getCurrentContent()))}
            />
          </div>
        </div>



      </div>
    );
  }
}
