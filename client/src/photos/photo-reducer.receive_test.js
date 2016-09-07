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
        {key: '2'},
        {key: '3'}
    ]
};

const action = {
    type: uploadPhotoActionTypes.RECEIVE,
    data: {key: '4'}
};

const reduced = photoReducer(origState, action);

test('mapping to correct amount of photos', t => {
    t.true(reduced.data.length === 4);
});

test('should not touch the original state', t => {
    t.is(reduced.data[0], origState.data[0]);
    t.is(reduced.data[1], origState.data[1]);
    t.is(reduced.data[2], origState.data[2]);
});

test('should add photo to state', t => {
    t.deepEqual(reduced.data[3], action.data);
});

test('should not touch action.data', t => {
    t.not(reduced.data[3], action.data);
});
