jest.mock('../fetch', () => ({
    get: jest.fn()
}));
import snFetch from '../fetch';
import fetchActionFactory from './fetch-action-factory';

const ACTION_TYPES = {
    REQUEST: 'REQUEST',
    RECEIVE: 'RECEIVE',
    FETCH_ERROR: 'FETCH_ERROR'
};

let fetchAction;
let dispatchSpy;

beforeEach(() => {
    const fetchPromise = new Promise(() => {});
    fetchAction = fetchActionFactory({
        actionTypes: ACTION_TYPES,
        url: '/url'
    });

    snFetch.get.mockReturnValue(fetchPromise);
    dispatchSpy = jest.fn();
});

it('delegation to fetch', () => {
    fetchAction(dispatchSpy);

    expect(snFetch.get).toHaveBeenCalledWith('/url', {});
});

it('dispatching of request event', () => {
    fetchAction(dispatchSpy);

    expect(dispatchSpy).toHaveBeenCalledWith({
        type: ACTION_TYPES.REQUEST,
        data: null
    });
});

