import debounce from 'debounce';

import * as idGenerator from '../../../common/id-generator';

import snFetch from '../fetch';

const DELAY = 3000;
const uid = idGenerator.uid();
const toggled = {};

function doNotTrack() {
    const {navigator, doNotTrack} = window;
    return navigator.doNotTrack || navigator.msDoNotTrack || doNotTrack;
}

function getData(content = {}) {
    const {innerHeight} = window;

    return {
        id: uid,
        innerHeight,
        toggled: Object.keys(toggled).length,
        ...content
    };
}

function send(content = {}) {
    if (doNotTrack()) {
        return;
    }

    snFetch.postJSON('/stats', getData(content));
}

function beaconSend(content = {}) {
    if (doNotTrack() || !navigator.sendBeacon) {
        return;
    }

    const data = getData(content);
    navigator.sendBeacon('/stats', JSON.stringify(data));
}

export const postStats = debounce(send, DELAY);
export const beaconStats = beaconSend;
export const trackToggle = key => {
    toggled[key] = true;
};
