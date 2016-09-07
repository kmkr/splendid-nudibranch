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
        {key: 'my key', value: 'foo'},
        {key: '3'}
    ]
};
const action = {
    type: updatePhotoActionTypes.RECEIVE,
    data: Object.freeze({key: 'my key', value: 'bar'})
};

const reduced = photoReducer(origState, action);

test('should map to correct amount of photos', t => {
    t.true(reduced.data.length === 3);
});

test('should update photo with the same key', t => {
    t.deepEqual(reduced.data[1], {
        ...action.data,
        updating: false
    });
});

test('should not touch action data', t => {
    t.not(reduced.data[1], action.data);
});

test('should not touch the original state', t => {
    t.is(reduced.data[0], origState.data[0]);
    t.is(reduced.data[2], origState.data[2]);
});
