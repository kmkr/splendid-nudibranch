import photoReducer from './photo-reducer';
import {
    deletePhotoActionTypes}
    from '../admin/photos/edit-photo-action-types';

const origState = {
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

const reduced = photoReducer(origState, action);
it('should map to correct amount of photos', () => {
    expect(reduced.data.length === 2).toBe(true);
});

it('should remove correct photo', () => {
    expect(reduced.data[0]).toEqual(origState.data[0]);
    expect(reduced.data[1]).toEqual(origState.data[2]);
});

it('should not touch the original state', () => {
    expect(reduced.data[0]).toBe(origState.data[0]);
    expect(reduced.data[1]).toBe(origState.data[2]);
});
