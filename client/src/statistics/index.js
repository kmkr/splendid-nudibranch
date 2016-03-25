import snFetch from '../fetch';

export function postStats() {
    const {navigator, doNotTrack} = window;
    if (navigator.doNotTrack || navigator.msDoNotTrack || doNotTrack) {
        return;
    }

    const {innerHeight, innerWidth} = window;
    const ua = navigator.userAgent;

    snFetch.postJSON('/stats', {
        innerWidth, innerHeight, ua
    });
}
