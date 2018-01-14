import photoReducer from './photo-reducer'
import {uploadPhotoActionTypes}
    from '../admin/photos/edit-photo-action-types'

const origState = {
  data: [
        {key: '1'},
        {key: '2'},
        {key: '3'}
  ]
}

const action = {
  type: uploadPhotoActionTypes.RECEIVE,
  data: {key: '4'}
}

const reduced = photoReducer(origState, action)

it('mapping to correct amount of photos', () => {
  expect(reduced.data.length === 4).toBe(true)
})

it('should not touch the original state', () => {
  expect(reduced.data[0]).toBe(origState.data[0])
  expect(reduced.data[1]).toBe(origState.data[1])
  expect(reduced.data[2]).toBe(origState.data[2])
})

it('should add photo to state', () => {
  expect(reduced.data[3]).toEqual(action.data)
})

it('should not touch action.data', () => {
  expect(reduced.data[3]).not.toBe(action.data)
})
