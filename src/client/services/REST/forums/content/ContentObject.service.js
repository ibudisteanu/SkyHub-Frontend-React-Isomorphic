/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/8/2017.
 * (C) BIT TECHNOLOGIES
 */

import Forum from './../../../../modules/forums/forums/models/Forum.model';

class ContentObjectServiceClass {


    /*
     Loading forum/topic/reply from the Id
     sObjectId contains inside also the type of the object example: 1_frm_14958198943447852
     */

    extractDataFromIds(objectId) {

        if ((typeof objectId === "object")&&(objectId !== null)) objectId = objectId.id;
        if (typeof objectId !== "string") return null;

        //console.log("extract data from Ids",objectId);

        var iDelimitatorPosLeft = objectId.indexOf("_");
        var iDelimitatorPosRight = objectId.indexOf("_", iDelimitatorPosLeft + 1);

        var iRedisDB = objectId.substring(0, iDelimitatorPosLeft);
        var sObjectType = objectId.substring(iDelimitatorPosLeft + 1, iDelimitatorPosRight);

        //console.log("finding OBJECT ID: ", iRedisDB, " :::: ", sObjectType, " :::: ", sObjectId);

        if ((iRedisDB !== 0) && (sObjectType !== ''))
            return {redisDB: iRedisDB, objectType: sObjectType};
        else
            return null
    }

    extractObjectTypeFromId(object) {

        let extractedIdData = this.extractDataFromIds(object);

        if (extractedIdData === null) return 'none';

        switch (extractedIdData.objectType || '') {
            case 'forum':
                return 'forum';

            case 'user':
                return 'user';

            case 'topic':
                return 'topic';
        }

        return 'none';
    }

    createObject(object) {

        //console.log(this.extractObjectTypeFromId(object));

        switch (this.extractObjectTypeFromId(object)) {
            case 'forum':
                return new Forum(object);
                break;
            /*case 'topic':
             return New Fo*/
        }

        return null;
    }
}


var ContentObjectService = new ContentObjectServiceClass();

export default ContentObjectService;

// export function ContentObjectService(){
//     return ContentObjectServiceInstance;
// };

