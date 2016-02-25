import photoReducer from './photo-reducer';
import {
    updatePhotoActionTypes,
    uploadPhotoActionTypes,
    deletePhotoActionTypes}
    from '../admin/photos/edit-photo-action-types';
import {expect} from 'chai';

describe('photo-reducer', () => {

    describe('on upload action', () => {
        let action, origState, reduced;

        beforeEach(() => {
            origState = {
                data: [
                    {key: '1'},
                    {key: '2'},
                    {key: '3'}
                ]
            };
            action = {
                type: uploadPhotoActionTypes.RECEIVE,
                data: {key: '4'}
            };

            reduced = photoReducer(origState, action);
        });

        it('should map to correct amount of photos', () => {
            expect(reduced.data).to.have.length(4);
        });

        it('should not touch the original state', () => {
            expect(reduced.data[0]).to.equal(origState.data[0]);
            expect(reduced.data[1]).to.equal(origState.data[1]);
            expect(reduced.data[2]).to.equal(origState.data[2]);
        });

        it('should add photo to state', () => {
            expect(reduced.data[3]).to.deep.equal(action.data);
        });

        it('should not touch action.data', () => {
            expect(reduced.data[3]).not.to.equal(action.data);
        });

    });

    describe('on update action', () => {
        let action, origState, reduced;

        beforeEach(() => {
            origState = {
                data: [
                    {key: '1'},
                    {key: 'my key', value: 'foo'},
                    {key: '3'}
                ]
            };
            action = {
                type: updatePhotoActionTypes.RECEIVE,
                data: Object.freeze({key: 'my key', value: 'bar'})
            };

            reduced = photoReducer(origState, action);
        });

        it('should map to correct amount of photos', () => {
            expect(reduced.data).to.have.length(3);
        });

        it('should update photo with the same key', () => {
            expect(reduced.data[1]).to.deep.equal(action.data);
        });

        it('should not touch action data', () => {
            expect(reduced.data[1]).not.to.equal(action.data);
        });

        it('should not touch the original state', () => {
            expect(reduced.data[0]).to.equal(origState.data[0]);
            expect(reduced.data[2]).to.equal(origState.data[2]);
        });

    });

    describe('on delete action', () => {
        let origState, reduced;

        beforeEach(() => {
            origState = {
                data: [
                    {key: '1'},
                    {key: 'my key'},
                    {key: '3'}
                ]
            };
            const action = {
                type: deletePhotoActionTypes.RECEIVE,
                data: {
                    key: 'my key'
                }
            };

            reduced = photoReducer(origState, action);
        });

        it('should map to correct amount of photos', () => {
            expect(reduced.data).to.have.length(2);
        });

        it('should remove correct photo', () => {
            expect(reduced.data[0]).to.deep.equal(origState.data[0]);
            expect(reduced.data[1]).to.deep.equal(origState.data[2]);
        });

        it('should not touch the original state', () => {
            expect(reduced.data[0]).to.equal(origState.data[0]);
            expect(reduced.data[1]).to.equal(origState.data[2]);
        });
    });

});
