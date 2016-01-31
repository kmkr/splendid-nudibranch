import {expect} from 'chai';

import * as photoDataFormatter from './photo-data-formatter';

describe('photo-data-formatter', function () {
    let dbPhoto;

    beforeEach(function () {
        dbPhoto = {
            _id: {
                '$oid': '56ae16af4ce08fa00c297107'
            },
            base: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev',
            key: 'dc23-3470',
            name: 'Ubuntu-Natty-Wallpaper.png',
            created_at: {
                '$date': '2016-01-31T14:14:07.720Z'
            },
            updated_at: {
                '$date': '2016-01-31T14:14:07.720Z'
            },
            description: 'Delfin :)'
        };
    });

    it('should format object', function () {
        expect(photoDataFormatter.dbToClient(dbPhoto)).to.eql({
            base: dbPhoto.base,
            description: dbPhoto.description,
            key: dbPhoto.key,
            name: dbPhoto.name
        });
    });
});
