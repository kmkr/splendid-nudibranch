import debounce from 'debounce';

import snFetch from '../fetch';

const DELAY = 4000;

function send(content = {}) {
    const {navigator, doNotTrack} = window;
    if (navigator.doNotTrack || navigator.msDoNotTrack || doNotTrack) {
        return;
    }

    const {innerHeight, innerWidth} = window;

    snFetch.postJSON('/stats', {
        innerWidth,
        innerHeight,
        ...content
    });
}

export const postStats = debounce(send, DELAY);
