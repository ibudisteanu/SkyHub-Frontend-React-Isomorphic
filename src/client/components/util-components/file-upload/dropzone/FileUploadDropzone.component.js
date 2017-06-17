/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

export default class FileUploadDropzone extends React.Component {
  constructor(props) {
    super(props);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,application/doc,application/docx,application/zip,application/rar",
      addRemoveLinks: true,
      params: {
        myParam: 'Hello from a parameter!',
        anotherParam: 43
      },
      maxFiles: props.maxFiles || 10,
    };



    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif', '.pdf','.zip'],
      showFiletypeIcon: true,
      postUrl: 'http://myskyhub.ddns.net:4000/upload/topic-file',
    };

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

    // Simple callbacks work too, of course
    this.callback = () => console.log('Hello!');

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

    // Simple callbacks work too, of course
    this.callback = () => console.log('Hello!');
    //
    // this.success = file => console.log('uploaded', file);
    //
    // this.removedfile = file => console.log('removing...', file);

    this.dropzone = null;

  }

  success(file){
    console.log("uploaded successfully ",file);
  }

  removedfile(file){
    console.log("removed successfully ",file);
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      drop: this.callbackArray,
      addedfile: this.callback,

      success: this.success,
      removedfile: this.removedfile,
    }

    return (
      <div>
        <strong>{this.props.title||'Upload files'}</strong>
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
      </div>
    );
  }
}
