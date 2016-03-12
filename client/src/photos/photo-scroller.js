import React, {Component, PropTypes} from 'react';

import ListPhotos from './list-photos';
import {getPhotoSizeForWidth} from '../../../common/constants';

const SHOW_PHOTOS = 3;

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSize: getPhotoSizeForWidth(this.props.scroll.innerWidth),
            visibleStart: 0,
            visibleEnd: SHOW_PHOTOS
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
            state.visibleEnd = Math.max(SHOW_PHOTOS,
                Math.min(props.photos.length, this.state.visibleEnd + 1));
        }

        this.setState(state);
    }

    render() {
        return (
            <div id="photo-scroller">
                {this.props.scroll.innerWidth}
                <ListPhotos
                    photos={this.props.photos}
                    photoSize={this.state.photoSize.name}
                    innerHeight={this.props.scroll.innerHeight}
                    visibleStart={this.state.visibleStart}
                    visibleEnd={this.state.visibleEnd} />

                <div id="photo-list-wrapper"></div>
            </div>
        );
    }
}

PhotoScroller.propTypes = {
    photos: PropTypes.array.isRequired
};

export default PhotoScroller;
