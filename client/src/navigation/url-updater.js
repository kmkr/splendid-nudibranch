import React, {Component} from 'react';
import {connect} from 'react-redux';

import smoothScroll from 'smooth-scroll';
import {selectPhoto} from '../photos/photo-actions';
import getActiveAnchor from './active-anchor-service';

class UrlUpdater extends Component {
    constructor(props) {
        super(props);

        // Dette sørger for at URL ikke oppdateres mens scrolling til et bilde pågår ved oppstart av
        // applikasjonen.

        this.booted = false;
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        const {dispatch} = this.props;
        const pathSegments = pathname.split('/');

        if (/photos/.test(pathSegments[1]) && pathSegments[2]) {
            const photoKey = pathSegments[2];
            dispatch(selectPhoto(photoKey));

            // Må vente på at anchors oppdateres
            setTimeout(() => {
                smoothScroll.animateScroll(`#photo-${photoKey}`, null, {
                    updateURL: false,
                    callback: () => this.booted = true
                });
            }, 500);
        } else {
            this.booted = true;
        }
    }

    componentWillReceiveProps({anchors, scroll}) {
        // Just opened the page
        if (!this.booted) {
            return;
        }

        if (!window.history.replaceState) {
            return;
        }

        const matching = getActiveAnchor({anchors, scroll});

        if (matching) {
            const newPath = `/${matching.name}`;
            if (newPath !== window.location.pathname) {
                history.replaceState(null, null, newPath);
            }
        }

        this.lastOffset = scroll.pageYOffset;
    }

    shouldComponentUpdate() {
        return false;
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

export default connect(select)(UrlUpdater);
