/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

/* eslint-disable import/prefer-default-export */

export default class Topic {

    title;
    URL;

    image: '';
    description;
    authorId;

    arrAttachments: [];
    arrKeywords: [];

    preferredLang;

    longitude;
    latitude;

    country;
    city;

    dtCreation;
    dtLastActivity;


    preview:false;

    constructor( data: Object = {}) {


        this.title = data.title || '';
        this.description = data.description || '';

        this.URL = data.URL || '';

        this.image = data.image || '';

        this.arrKeywords = data.keywords || [];
        this.arrAttachments = data.attachments || [];

        this.preferredLang = data.preferredLang || data.language || null;

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = data.dtCreation || Date.now();
        this.dtLastActivity = data.dtLastActivity || Date.now();

        this.longitude = data.longitude || -666;
        this.latitude = data.latitude || -666;

        this.preview = data.preview||false;

        console.log('Forum Assigned');
    }

    getAuthor(){
        return null;
    }

    getLinkAttachment(){
      for (let i=0; i<this.arrAttachments; i++)
        if (this.arrAttachments[i].type === "link"){
          return this.arrAttachments[i];
        }

      return null;
    }

    getTitle(){
      if (this.title !== '') return this.title;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().title;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].title;

      return '';
    }

    getDescription(){
      if (this.title !== '') return this.description;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().description;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].description;

      return '';
    }

    getImage(){
      if (this.image !== '') return this.image;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().image;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].image;

      return '';
    }

}
