import React, {Component} from 'react';
import {connect} from 'react-redux';

import smoothScroll from 'smooth-scroll';
import {selectPhoto} from '../photos/photo-actions';

class HashchangeHandler extends Component {
    constructor(props) {
        super(props);

        // Dette sørger for at URL ikke oppdateres mens scrolling til et bilde pågår ved oppstart av
        // applikasjonen.

        this.booted = false;
    }

    componentDidMount() {
        const hash = window.location.hash;
        if (!hash) {
            this.booted = true;
            return;
        }

        const {dispatch} = this.props;
        const hashSegments = hash.split('#')[1].split('/');

        if (/photos/.test(hashSegments[0]) && hashSegments[1]) {
            dispatch(selectPhoto(hashSegments[1]));

            // Må vente på at anchors oppdateres
            setTimeout(() => {
                smoothScroll.animateScroll(`#photo-${hashSegments[1]}`, null, {
                    updateURL: false,
                    callback: () => this.booted = true
                });
            }, 500);
        }
    }

    componentWillReceiveProps({anchors, scroll}) {
        // Just opened the page
        if (!this.booted) {
            return;
        }

        const currentOffset = scroll.pageYOffset;

        // Somewhere on the collage, moving upwards
        if (this.lastOffset > currentOffset && currentOffset < scroll.innerHeight) {
            if ('/' !== window.location.hash) {
                history.replaceState(null, null, '/');
            }
        } else {
            const matching = (anchors
                .filter(anchor => currentOffset >= (anchor.position.offsetTop - (scroll.innerHeight / 1.8)))
                .reverse())[0];

            if (matching) {
                const newHash = `#${matching.name}`;
                if (newHash !== window.location.hash) {
                    history.replaceState(null, null, newHash);
                }
            }
        }

        this.lastOffset = currentOffset;
    }

    render() {
        return <span />;
    }
}

function select(state) {
    return {
        anchors: state.anchors,
        scroll: state.scroll
    };
}

export default connect(select)(HashchangeHandler);
