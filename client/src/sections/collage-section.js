import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';

import SmallCollage from '../collage/small-collage';
import LargeCollage from '../collage/large-collage';
import {collageItemSelected} from '../collage/collage-actions';

function scrollTo(location) {
    smoothScroll.animateScroll(location, null, {updateURL: false});
}

const threshold = 1200;

class CollageSection extends Component {
    itemClicked(key) {
        this.props.dispatch(collageItemSelected(key));
        scrollTo('#photo-section');
    }

    photoLinkClicked() {
        scrollTo('#photo-section');
    }

    render() {
        const {scroll} = this.props;
        return (
            <div id="collage-section">
                {scroll.innerWidth > threshold ?
                    <LargeCollage
                        scroll={scroll}
                        itemClicked={this.itemClicked.bind(this)}
                        photoLinkClicked={this.photoLinkClicked.bind(this)} /> :

                    <SmallCollage
                        scroll={scroll} />
                }
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
