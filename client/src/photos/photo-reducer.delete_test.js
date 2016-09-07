import test from 'ava';

import photoReducer from './photo-reducer';
import {
    updatePhotoActionTypes,
    uploadPhotoActionTypes,
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
test('should map to correct amount of photos', t => {
    t.true(reduced.data.length === 2);
});

test('should remove correct photo', t => {
    t.deepEqual(reduced.data[0], origState.data[0]);
    t.deepEqual(reduced.data[1], origState.data[2]);
});

test('should not touch the original state', t => {
    t.is(reduced.data[0], origState.data[0]);
    t.is(reduced.data[1], origState.data[2]);
});
