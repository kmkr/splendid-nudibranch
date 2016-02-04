import photoReducer from './photo-reducer';
import {
    uploadPhotoActionTypes,
    deletePhotoActionTypes}
    from '../admin/photos/edit-photo-action-types';
import {expect} from 'chai';

describe('photo-reducer', () => {

    it('should add photo on upload', () => {
        const origState = {
            data: [1, 2, 3, 4]
        };
        const action = {
            type: uploadPhotoActionTypes.RECEIVE,
            data: 5
        };
        const reduced = photoReducer(origState, action);
        expect(reduced).to.have.property('data').that.deep.equals([1, 2, 3, 4, 5]);
    });

    it('should update photo');

    it('should delete photo', () => {
        const origState = {
            data: [{
                key: 'my key'
            }]
        };
        const action = {
            type: deletePhotoActionTypes.RECEIVE,
            data: {
                key: 'my key'
            }
        };

        const reduced = photoReducer(origState, action);

        expect(reduced).to.have.property('data').that.is.empty;
    });

});
