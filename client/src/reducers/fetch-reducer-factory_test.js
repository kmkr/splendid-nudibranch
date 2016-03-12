import reducerFactory from './fetch-reducer-factory';
import {expect} from 'chai';

describe('fetch-reducer-factory', () => {
    let actionTypes, reducer;

    beforeEach(() => {
        actionTypes = {
            REQUEST: 'req',
            RECEIVE: 'rec',
            FETCH_ERROR: 'error'
        };
        reducer = reducerFactory({initialDataValue: [], actionTypes});
    });

    it('should return object for REQUEST', () => {
        const action = {
            type: actionTypes.REQUEST
        };
        const state = reducer(undefined, action);

        expect(state).to.have.property('ongoingRequest', true);
        expect(state.error).to.be.undefined;
        expect(state.data).to.eql([]);
    });

    it('should return object for RECEIVE', () => {
        const action = {
            type: actionTypes.RECEIVE,
            data: [{foo: 'bar'}]
        };
        const state = reducer(undefined, action);

        expect(state.ongoingRequest).to.equal(false);
        expect(state.error).to.be.undefined;
        expect(state.data).to.eql([{foo: 'bar'}]);
    });

    it('should return object for FETCH_ERROR', () => {
        const action = {
            type: actionTypes.FETCH_ERROR,
            error: 'An error'
        };
        const state = reducer(undefined, action);

        expect(state.ongoingRequest).to.equal(false);
        expect(state.error).to.equal('An error');
        expect(state.data).to.eql([]);
    });

});
