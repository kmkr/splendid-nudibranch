import React, {Component, PropTypes} from 'react';

import Photo from './photo';
import {postStats} from '../statistics';

let photosLoaded = 0;

class ListPhotos extends Component {
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
                    this.isVisible(index) ? (
                        <Photo
                            key={photo.key}
                            onPhotoLoad={this.photoLoaded.bind(this)}
                            availHeight={availHeight}
                            photo={photo} />
                        ) : null
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
