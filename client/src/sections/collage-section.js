import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';

import Collage from '../collage';
import {collageItemSelected} from '../collage/collage-actions';
import './collage-section.scss';

function scrollTo(location) {
    smoothScroll.animateScroll(location, null, {updateURL: false});
}

class CollageSection extends Component {
    itemClicked(key) {
        this.props.dispatch(collageItemSelected(key));
        scrollTo('#photo-section');
    }

    photoLinkClicked() {
        scrollTo('#photo-section');
    }

    render() {
        return (
            <div
                id="collage-section"
                style={{height: `${this.props.scroll.innerHeight}px`}}>
                <Collage
                    itemClicked={this.itemClicked.bind(this)}
                    photoLinkClicked={this.photoLinkClicked.bind(this)} />
            </div>
        );
    }
}

function select(state) {
    return {
        scroll: state.scroll
    };
}

export default connect(select)(CollageSection);
