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
        this.authorId = data.authorId || '';

        this.arrKeywords = data.keywords || [];
        this.arrAttachments = data.attachments || [];

        this.preferredLang = data.preferredLang || data.language || null;

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = ((typeof data.dtCreation === "string")&&(data.dtCreation !== '')) ? Date.parse(data.dtCreation) : new Date(data.dtCreation||new Date());
        this.dtLastActivity = ((typeof data.dtLastActivity === "string")&&(data.dtLastActivity !== '')) ? Date.parse(data.dtLastActivity) : new Date(data.dtLastActivity||new Date());

        this.longitude = data.longitude || -666;
        this.latitude = data.latitude || -666;

        this.preview = data.preview||false;

        console.log('Topic Assigned');
    }

    getAuthor(){
        return null;
    }


    getLinkAttachment(){
      for (let i=0; i<this.arrAttachments.length; i++)
        if (this.arrAttachments[i].type === "link"){
          return this.arrAttachments[i];
        }

      return null;
    }

    getTitle(){
      console.log("getTitle", this.title, this.attachments, this.getLinkAttachment());
      if (this.title !== '') return this.title;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().title;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].title;

      return '';
    }

    getDescription(){
      if (this.description !== '') return this.description;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().description;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].description;

      return '';
    }

    getImage(){
      if ((typeof this.image !== "undefined")&&(this.image !== '')) return this.image;

      if (this.arrAttachments.length > 0 ) //I have an uploaded image
        for (let i=0; i<this.arrAttachments.length; i++)
          if ((this.arrAttachments[i].type === "file")&&(this.arrAttachments[i].typeFile.indexOf("image") >= 0 ))
            return this.arrAttachments[0].img;

      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().img;

      return '';
    }

    getKeywords(){
      if ((typeof this.arrKeywords !== "undefined")&&(this.arrKeywords !== '')) return this.arrKeywords;
      if (this.getLinkAttachment() !== null) return this.getLinkAttachment().keywords;
      if (this.arrAttachments.length > 0 ) return this.arrAttachments[0].keywords;

      return '';
    }


}
