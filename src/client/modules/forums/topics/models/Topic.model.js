/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

/* eslint-disable import/prefer-default-export */

export default class Topic {

    title;
    URL;
    description;
    authorId;

    attachments: [];
    keywords;


    preferredLang;

    longitude;
    latitude;

    country;
    city;

    dtCreation;
    dtLastActivity;


    constructor( data: Object = {}) {


        this.title = data.title || '';
        this.description = data.description || '';

        this.URL = data.URL || '';

        this.keywords = data.keywords || '';
        this.attachments = data.attachments || [];

        this.preferredLang = data.preferredLang || data.language || null;

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = data.dtCreation || Date.now();
        this.dtLastActivity = data.dtLastActivity || Date.now();

        this.longitude = data.longitude || -666;
        this.latitude = data.latitude || -666;

        console.log('Forum Assigned');
    }

    getAuthor(){
        return null;
    }
}
