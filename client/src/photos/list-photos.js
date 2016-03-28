import React, {Component, PropTypes} from 'react';

import Photo from './photo';
import {postStats} from '../statistics';

let photosLoaded = 0;

class ListPhotos extends Component {
    incrementAndPost() {
        photosLoaded++;
        postStats({photosLoaded});
    }

    isVisible(index) {
        const {photos, visibleStart} = this.props;
        let {visibleEnd} = this.props;
        if (!visibleEnd) {
            visibleEnd = photos.length;
        }

        return index >= visibleStart && index < visibleEnd;
    }

    render() {
        const {innerHeight, photos, photoSize} = this.props;

        return (
            <div>
                {photos.map((photo, index) => (
                    this.isVisible(index) ? (
                        <Photo
                            key={photo.key}
                            onPhotoLoad={this.incrementAndPost}
                            innerHeight={innerHeight}
                            photo={photo}
                            photoSize={photoSize} />
                        ) : null
                ))}

            </div>
        );
    }
}

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    photoSize: PropTypes.string.isRequired,
    innerHeight: PropTypes.number.isRequired,
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number
};

ListPhotos.defaultProps = {
    visibleStart: 0
};

export default ListPhotos;
