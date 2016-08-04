import React, {Component, PropTypes} from 'react';
import shallowCompare from 'shallow-compare-without-functions';

import Photo from './photo';
import {postStats, beaconStats} from '../statistics';

let photosLoaded = 0;

class ListPhotos extends Component {

    constructor(props) {
        super(props),

        this.photoLoaded = this.photoLoaded.bind(this);
    }

    componentWillMount() {
        window.addEventListener('unload', () => {
            beaconStats({photosLoaded});
        });
    }

    shouldComponentUpdate(nextProps, nextStyle) {
        return shallowCompare(this, nextProps, nextStyle);
    }

    photoLoaded(photo) {
        const {onPhotoLoad} = this.props;
        photosLoaded++;
        postStats({photosLoaded});
        onPhotoLoad({key: photo.key});
    }

    isVisible(index) {
        const {photos} = this.props;
        let {visibleEnd} = this.props;
        if (!visibleEnd) {
            visibleEnd = photos.length;
        }

        return index < visibleEnd;
    }

    render() {
        const {availHeight, photos} = this.props;

        return (
            <div>
                {photos.map((photo, index) => (
                    this.isVisible(index) && (
                        <Photo
                            key={photo.key}
                            onPhotoLoad={this.photoLoaded}
                            availHeight={availHeight}
                            photo={photo} />
                        )
                ))}
            </div>
        );
    }
}

ListPhotos.propTypes = {
    onPhotoLoad: PropTypes.func.isRequired,
    photos: PropTypes.array.isRequired,
    availHeight: PropTypes.number.isRequired,
    visibleEnd: PropTypes.number
};

export default ListPhotos;
