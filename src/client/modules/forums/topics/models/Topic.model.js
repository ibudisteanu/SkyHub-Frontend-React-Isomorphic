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

        console.log('Forum Assigned');
    }

    getAuthor(){
        return null;
    }



}
