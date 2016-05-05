import React, {Component, PropTypes} from 'react';

import ListPhotos from './list-photos';

const LOAD_AT_START = Math.ceil(window.innerHeight / 1000);
const LOAD_AT_A_TIME = 2;

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleEnd: LOAD_AT_START
        };
    }

    componentWillReceiveProps(props) {
        const state = {};
        const photoListWrapper = this.refs['photo-list-wrapper'];
        const {innerHeight, pageYOffset} = props.scroll;
        const SOME_BUFFER = innerHeight / 2;
        if ((pageYOffset + innerHeight + SOME_BUFFER) > photoListWrapper.offsetTop) {
            state.visibleEnd = Math.min(
                props.photos.length,
                Math.max(LOAD_AT_START, props.photos.filter(p => p.loaded).length + LOAD_AT_A_TIME)
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
                    availHeight={this.props.scroll.availHeight}
                    visibleEnd={this.state.visibleEnd} />

                <div ref="photo-list-wrapper" />
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
