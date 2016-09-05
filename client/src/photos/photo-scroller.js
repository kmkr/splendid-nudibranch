import React, {PureComponent, PropTypes} from 'react';

import ListPhotos from './list-photos';

const AVAIL_HEIGHT = screen.availHeight;
const LOAD_AT_START = Math.ceil(AVAIL_HEIGHT / 1000);
const LOAD_AT_A_TIME = 1;

class PhotoScroller extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visibleEnd: LOAD_AT_START
        };
    }

    componentWillReceiveProps(props) {
        const state = {};
        const photoListWrapper = this.refs['photo-list-wrapper'];
        const {pageYOffset} = props;
        const SOME_BUFFER = AVAIL_HEIGHT * 2;
        if ((pageYOffset + AVAIL_HEIGHT + SOME_BUFFER) > photoListWrapper.offsetTop) {
            const visibleEnd = Math.min(
                props.photos.length,
                Math.max(LOAD_AT_START, props.photos.filter(p => p.loaded).length + LOAD_AT_A_TIME)
            );

            if (visibleEnd !== state.visibleEnd) {
                this.setState({visibleEnd});
            }
        }

    }

    render() {
        return (
            <div id="photo-scroller">
                <ListPhotos
                    onPhotoLoad={this.props.onPhotoLoad}
                    photos={this.props.photos}
                    visibleEnd={this.state.visibleEnd} />

                <div ref="photo-list-wrapper" />
            </div>
        );
    }
}

PhotoScroller.propTypes = {
    onPhotoLoad: PropTypes.func.isRequired,
    photos: PropTypes.array.isRequired,
    pageYOffset: PropTypes.number.isRequired
};

export default PhotoScroller;
