import test from 'ava';
import snFetch from '../fetch';
import fetchActionFactory from './fetch-action-factory';
import sinon from 'sinon';

const ACTION_TYPES = {
    REQUEST: 'REQUEST',
    RECEIVE: 'RECEIVE',
    FETCH_ERROR: 'FETCH_ERROR'
};

test.beforeEach(t => {
    const fetchPromise = new Promise(() => {});
    t.context.fetchAction = fetchActionFactory({
        actionTypes: ACTION_TYPES,
        url: '/url'
    });

    t.context.getStub = sinon.stub(snFetch, 'get');
    t.context.getStub.returns(fetchPromise);
    t.context.dispatchSpy = sinon.spy();
});

test.afterEach(t => {
    t.context.getStub.restore();
});

test('delegation to fetch', t => {
    t.context.fetchAction(t.context.dispatchSpy);

    t.true(t.context.getStub.calledWith('/url', {}));
});

test('dispatching of request event', t => {
    t.context.fetchAction(t.context.dispatchSpy);

    t.true(t.context.dispatchSpy.calledWith({
        type: ACTION_TYPES.REQUEST,
        data: null
    }));
});

