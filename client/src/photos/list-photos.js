import React, {PureComponent, PropTypes} from 'react';

import Photo from './photo';

class ListPhotos extends PureComponent {

    constructor(props) {
        super(props),

        this.photoLoaded = this.photoLoaded.bind(this);
    }

    photoLoaded(photo) {
        const {onPhotoLoad} = this.props;
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
        const {photos} = this.props;

        return (
            <div>
                {photos.map((photo, index) => (
                    this.isVisible(index) && (
                        <Photo
                            key={photo.key}
                            onPhotoLoad={this.photoLoaded}
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
    visibleEnd: PropTypes.number
};

export default ListPhotos;
