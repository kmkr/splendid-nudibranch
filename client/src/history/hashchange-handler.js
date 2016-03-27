import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import smoothScroll from 'smooth-scroll';
import {selectPhoto} from '../photos/photo-actions';

class HashchangeHandler extends Component {

    componentDidMount() {
        window.addEventListener('hashchange', ({newURL}) => (
            this.handleHashchange(newURL)
        ));

        // The rest of the components are not yet necessarily mounted.
        setTimeout(() => {
            this.handleHashchange(window.location.hash);
        }, 800);
    }

    handleHashchange(newURL) {
        if (!newURL) {
            return;
        }

        const {dispatch} = this.props;
        const hash = newURL.split('#')[1];
        const segments = hash.split('/');

        if (/photos/.test(segments[0]) && segments[1]) {
            dispatch(selectPhoto(segments[1]));
            smoothScroll.animateScroll(`#photo-${segments[1]}`, null, {updateURL: false});
        } else if (/photos/.test(segments[0])) {
            smoothScroll.animateScroll('#photo-section', null, {updateURL: false});
        }
    }

    render() {
        return <span />;
    }
}

function select(state) {
    return {
        scroll: state.scroll
    };
}

export default connect(select)(HashchangeHandler);
