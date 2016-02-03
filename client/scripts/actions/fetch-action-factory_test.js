import chai, {expect} from 'chai';
import snFetch from '../fetch';
import fetchActionFactory from './fetch-action-factory';
import sinon from 'imports?define=>false,require=>false!sinon/pkg/sinon.js';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('fetch-action-factory', () => {
    let actionTypes, dispatchSpy, fetchAction, fetchPromise, getStub;
    beforeEach(() => {
        actionTypes = {
            REQUEST: 'REQUEST',
            RECEIVE: 'RECEIVE',
            FETCH_ERROR: 'FETCH_ERROR'
        };

        fetchPromise = new Promise(() => {});
    });

    beforeEach(() => {
        fetchAction = fetchActionFactory({
            actionTypes,
            url: '/url'
        });

        getStub = sinon.stub(snFetch, 'get');
        getStub.returns(fetchPromise);
        dispatchSpy = sinon.spy();
    });

    afterEach(() => {
        getStub.restore();
    });

    it('should delegate to fetch', () => {
        fetchAction(dispatchSpy);

        expect(getStub).to.have.been.calledWith('/url', {});
    });

    it('should dispatch request event', () => {
        fetchAction(dispatchSpy);

        expect(dispatchSpy).to.have.been.calledWith({
            type: actionTypes.REQUEST
        });
    });

});
