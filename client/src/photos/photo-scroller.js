import React, {Component, PropTypes} from 'react';

import ListPhotos from './list-photos';
import {getPhotoSizeForWidth} from '../../../common/constants';
import throttle from './throttler';

const SHOW_PHOTOS = 2;

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSize: this.getPhotoSize(),
            visibleStart: 0,
            visibleEnd: Math.min(this.props.photos.length, SHOW_PHOTOS)
        };
        this.onScroll = this.onScroll.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    componentWillMount() {
        throttle('scroll', 'optimizedScroll');
        throttle('resize', 'optimizedResize');
        window.addEventListener('optimizedScroll', this.onScroll);
        window.addEventListener('optimizedResize', this.onResize);
    }

    componentWillReceiveProps(props) {
        this.setState({
            visibleStart: 0,
            visibleEnd: Math.min(props.photos.length, SHOW_PHOTOS)
        });
    }

    componentWillUnmount() {
        window.removeEventListener('optimizedScroll', this.onScroll);
        window.removeEventListener('optimizedResize', this.onResize);
    }

    getPhotoSize() {
        const {innerWidth} = window;
        return getPhotoSizeForWidth(innerWidth);
    }

    onScroll() {
        const photoListWrapper = document.getElementById('photo-list-wrapper');
        const {innerHeight, pageYOffset} = window;
        if ((pageYOffset + innerHeight) > photoListWrapper.offsetHeight) {
            this.setState({
                visibleStart: 0,
                visibleEnd: this.state.visibleEnd + 1
            });
        }
    }

    onResize() {
        if (this.getPhotoSize().width > this.state.photoSize.width) {
            this.setState({
                photoSize: this.getPhotoSize()
            });
        }
        this.onScroll();
    }

    render() {
        return (<ListPhotos
            photos={this.props.photos}
            photoSize={this.state.photoSize.name}
            visibleStart={this.state.visibleStart}
            visibleEnd={this.state.visibleEnd} />
        );
    }
}

PhotoScroller.propTypes = {
    photos: PropTypes.array.isRequired
};

export default PhotoScroller;
