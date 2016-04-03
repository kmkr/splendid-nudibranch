import React, {Component, PropTypes} from 'react';

import ListPhotos from './list-photos';
import {getPhotoSizeForWidth} from '../../../common/constants';

const LOAD_AT_A_TIME = 2;

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSize: getPhotoSizeForWidth(this.props.scroll.innerWidth),
            visibleEnd: LOAD_AT_A_TIME
        };
    }

    componentWillReceiveProps(props) {
        const state = {};
        const photoSize = getPhotoSizeForWidth(props.scroll.innerWidth);
        if (photoSize.width > this.state.photoSize.width) {
            state.photoSize = photoSize;
        }
        const photoListWrapper = document.getElementById('photo-list-wrapper');
        const {innerHeight, pageYOffset} = props.scroll;
        if ((pageYOffset + innerHeight) > photoListWrapper.offsetTop) {
            state.visibleEnd = Math.min(
                props.photos.filter(p => p.loaded).length + 1,
                Math.max(LOAD_AT_A_TIME, Math.min(props.photos.length, this.state.visibleEnd + LOAD_AT_A_TIME))
            );
        }

        this.setState(state);
    }

    render() {
        return (
            <div id="photo-scroller">
                <ListPhotos
                    onPhotoLoad={this.props.onPhotoLoad}
                    photos={this.props.photos}
                    photoSize={this.state.photoSize.name}
                    innerHeight={this.props.scroll.innerHeight}
                    visibleEnd={this.state.visibleEnd} />

                <div id="photo-list-wrapper"></div>
            </div>
        );
    }
}

PhotoScroller.propTypes = {
    onPhotoLoad: PropTypes.func.isRequired,
    photos: PropTypes.array.isRequired,
    scroll: PropTypes.object.isRequired
};

export default PhotoScroller;
